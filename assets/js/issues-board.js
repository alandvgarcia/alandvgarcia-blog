(function () {
  const root = document.getElementById("github-issues-board-root");
  if (!root) return;

  const repo = root.getAttribute("data-repo") || "alandvgarcia/alandvgarcia-blog";
  const CACHE_KEY = "gh_issues_cache_" + repo;
  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

  const searchInput = document.getElementById("issues-search-input");
  const refreshBtn = document.getElementById("issues-refresh-btn");
  const statusMsg = document.getElementById("board-status-message");

  const colTodo = document.getElementById("cards-todo");
  const colInProgress = document.getElementById("cards-in-progress");
  const colDone = document.getElementById("cards-done");

  const countTodo = document.getElementById("count-todo");
  const countInProgress = document.getElementById("count-in-progress");
  const countDone = document.getElementById("count-done");

  let allIssues = [];

  function showStatus(text, isError = false) {
    statusMsg.className = isError ? "board-status-banner" : "board-status-hidden";
    statusMsg.innerHTML = text;
  }

  function clearSkeletons(message = "Não foi possível carregar as tarefas") {
    colTodo.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">${message}</div>`;
    colInProgress.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">${message}</div>`;
    colDone.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">${message}</div>`;
    countTodo.textContent = "0";
    countInProgress.textContent = "0";
    countDone.textContent = "0";
  }

  function getCachedIssues() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.timestamp < CACHE_TTL_MS) {
        return data.issues;
      }
    } catch (e) {
      console.warn("Failed to read cache", e);
    }
    return null;
  }

  function setCachedIssues(issues) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        issues: issues
      }));
    } catch (e) {
      console.warn("Failed to save cache", e);
    }
  }

  async function fetchIssues(force = false) {
    if (!force) {
      const cached = getCachedIssues();
      if (cached) {
        allIssues = cached;
        render();
        return;
      }
    }

    try {
      showStatus("");
      const response = await fetch(`https://api.github.com/repos/${repo}/issues?state=all&per_page=100`);
      
      if (response.status === 403) {
        const rateLimitReset = response.headers.get("X-RateLimit-Reset");
        const resetTime = rateLimitReset ? new Date(rateLimitReset * 1000).toLocaleTimeString() : "";
        showStatus(`⚠️ Limite de requisições temporário da API anônima do GitHub atingido (reseta às ${resetTime}). <a href="https://github.com/${repo}/issues" target="_blank" rel="noopener noreferrer" style="text-decoration:underline; font-weight:bold;">Acessar issues no GitHub</a>`, true);
        clearSkeletons();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      // Filter out pull requests (GitHub API returns PRs as issues)
      allIssues = data.filter(item => !item.pull_request);
      setCachedIssues(allIssues);
      render();
    } catch (err) {
      console.error("Error fetching issues:", err);
      showStatus(`Não foi possível carregar as issues em tempo real. <a href="https://github.com/${repo}/issues" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Clique aqui para ver no GitHub</a>.`, true);
      clearSkeletons();
    }
  }

  function categorizeIssue(issue) {
    if (issue.state === "closed") {
      return "done";
    }

    const labels = (issue.labels || []).map(l => (typeof l === "string" ? l : l.name).toLowerCase());
    
    if (labels.some(l => l.includes("in-progress") || l.includes("doing") || l.includes("andamento"))) {
      return "in-progress";
    }

    if (labels.some(l => l.includes("done") || l.includes("concluido") || l.includes("concluído"))) {
      return "done";
    }

    return "todo";
  }

  function createCardElement(issue) {
    const card = document.createElement("a");
    card.className = "issue-card";
    card.href = issue.html_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const numberDiv = document.createElement("div");
    numberDiv.className = "issue-number";
    numberDiv.textContent = `#${issue.number}`;

    const titleDiv = document.createElement("div");
    titleDiv.className = "issue-title";
    titleDiv.textContent = issue.title;

    const labelsDiv = document.createElement("div");
    labelsDiv.className = "issue-labels";

    (issue.labels || []).forEach(label => {
      const name = typeof label === "string" ? label : label.name;
      const color = label.color ? `#${label.color}` : "#0284c7";
      const span = document.createElement("span");
      span.className = "issue-label";
      span.textContent = name;
      span.style.backgroundColor = color + "25";
      span.style.color = color;
      span.style.border = `1px solid ${color}60`;
      labelsDiv.appendChild(span);
    });

    const footerDiv = document.createElement("div");
    footerDiv.className = "issue-footer";
    const commentsSpan = document.createElement("span");
    commentsSpan.textContent = `💬 ${issue.comments || 0}`;
    const authorSpan = document.createElement("span");
    authorSpan.textContent = `@${issue.user ? issue.user.login : "autor"}`;
    footerDiv.appendChild(commentsSpan);
    footerDiv.appendChild(authorSpan);

    card.appendChild(numberDiv);
    card.appendChild(titleDiv);
    if ((issue.labels || []).length > 0) {
      card.appendChild(labelsDiv);
    }
    card.appendChild(footerDiv);

    return card;
  }

  function render() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

    const filtered = allIssues.filter(issue => {
      if (!query) return true;
      const titleMatch = issue.title.toLowerCase().includes(query);
      const labelMatch = (issue.labels || []).some(l => {
        const name = typeof l === "string" ? l : l.name;
        return name.toLowerCase().includes(query);
      });
      return titleMatch || labelMatch;
    });

    const todoList = [];
    const inProgressList = [];
    const doneList = [];

    filtered.forEach(issue => {
      const cat = categorizeIssue(issue);
      if (cat === "in-progress") inProgressList.push(issue);
      else if (cat === "done") doneList.push(issue);
      else todoList.push(issue);
    });

    colTodo.innerHTML = "";
    colInProgress.innerHTML = "";
    colDone.innerHTML = "";

    todoList.forEach(item => colTodo.appendChild(createCardElement(item)));
    inProgressList.forEach(item => colInProgress.appendChild(createCardElement(item)));
    doneList.forEach(item => colDone.appendChild(createCardElement(item)));

    countTodo.textContent = todoList.length;
    countInProgress.textContent = inProgressList.length;
    countDone.textContent = doneList.length;

    if (todoList.length === 0) colTodo.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">Nenhuma tarefa no backlog</div>`;
    if (inProgressList.length === 0) colInProgress.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">Nenhuma tarefa em andamento</div>`;
    if (doneList.length === 0) colDone.innerHTML = `<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">Nenhuma tarefa concluída ainda</div>`;
  }

  if (searchInput) {
    searchInput.addEventListener("input", render);
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      sessionStorage.removeItem(CACHE_KEY);
      colTodo.innerHTML = `<div class="card-skeleton"></div>`;
      colInProgress.innerHTML = `<div class="card-skeleton"></div>`;
      colDone.innerHTML = `<div class="card-skeleton"></div>`;
      fetchIssues(true);
    });
  }

  fetchIssues();
})();
