(function () {
  "use strict";

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fetchPosts() {
    return fetch("/data/posts.json")
      .then(function (res) {
        if (!res.ok) throw new Error("No se pudieron cargar los posts");
        return res.json();
      })
      .catch(function (err) {
        console.error(err);
        return [];
      });
  }

  function renderRecentPosts(posts) {
    var container = document.getElementById("blog-recent-posts");
    if (!container) return;
    var sorted = posts.slice().sort(function (a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    });
    var recent = sorted.slice(0, 3);
    container.innerHTML = recent
      .map(function (post) {
        return (
          '<a class="blog-card" href="/blog/' + escapeHtml(post.slug) + '.html">' +
          '<span class="blog-card-tag">' + escapeHtml((post.tags && post.tags[0]) || "Blog") + "</span>" +
          '<span class="blog-card-date">' + formatDate(post.fecha) + "</span>" +
          "<h3>" + escapeHtml(post.titulo) + "</h3>" +
          '<p class="blog-card-excerpt">' + escapeHtml(post.extracto) + "</p>" +
          '<span class="blog-card-readmore">Leer más →</span>' +
          "</a>"
        );
      })
      .join("");
  }

  function renderSidebarRecent(posts, currentSlug) {
    var list = document.getElementById("blog-sidebar-recent");
    if (!list) return;
    var sorted = posts
      .slice()
      .filter(function (p) {
        return p.slug !== currentSlug;
      })
      .sort(function (a, b) {
        return new Date(b.fecha) - new Date(a.fecha);
      })
      .slice(0, 4);
    list.innerHTML = sorted
      .map(function (post) {
        return '<li><a href="/blog/' + escapeHtml(post.slug) + '.html">' + escapeHtml(post.titulo) + "</a></li>";
      })
      .join("");
  }

  function renderSidebarTags(posts) {
    var container = document.getElementById("blog-sidebar-tags");
    if (!container) return;
    var tags = {};
    posts.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        tags[t] = true;
      });
    });
    container.innerHTML = Object.keys(tags)
      .map(function (t) {
        return '<a href="/blog/index.html#posts">' + escapeHtml(t) + "</a>";
      })
      .join("");
  }

  function initSubscribeForm() {
    var form = document.getElementById("blog-subscribe-form");
    if (!form) return;
    var msg = document.getElementById("blog-subscribe-msg");
    var button = form.querySelector("button");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('[name="name"]');
      var emailInput = form.querySelector('[name="email"]');
      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      nameInput.classList.remove("invalid");
      emailInput.classList.remove("invalid");
      msg.textContent = "";
      msg.className = "blog-subscribe-msg";

      var valid = true;
      if (name.length < 2) {
        nameInput.classList.add("invalid");
        valid = false;
      }
      if (!emailRegex.test(email)) {
        emailInput.classList.add("invalid");
        valid = false;
      }
      if (!valid) {
        msg.textContent = "Revisa tu nombre y correo.";
        msg.classList.add("error");
        return;
      }

      button.disabled = true;
      button.textContent = "Enviando...";

      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            msg.textContent = "¡Listo! Ya estás suscrito.";
            msg.classList.add("success");
            form.reset();
          } else {
            msg.textContent = result.data.error || "Algo salió mal. Intenta de nuevo.";
            msg.classList.add("error");
          }
        })
        .catch(function () {
          msg.textContent = "No pudimos conectar con el servidor. Intenta más tarde.";
          msg.classList.add("error");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = "Suscribirme";
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSubscribeForm();
    if (document.getElementById("blog-recent-posts")) {
      fetchPosts().then(renderRecentPosts);
    }
    var sidebarSlug = document.body.getAttribute("data-post-slug");
    if (document.getElementById("blog-sidebar-recent")) {
      fetchPosts().then(function (posts) {
        renderSidebarRecent(posts, sidebarSlug);
        renderSidebarTags(posts);
      });
    }
  });
})();
