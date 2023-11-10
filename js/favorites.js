export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers,
      }));
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.users = JSON.parse(localStorage.getItem("@git-hub-favorites")) || [];
  }

  save() {
    localStorage.setItem("@git-hub-favorites", JSON.stringify(this.users));
  }

  async add(username) {
    const userExist = this.users.find((user) => user.login === username);

    if (userExist) {
      throw new Error("Usuário já cadastrado");
    }
    try {
      const user = await GithubUser.search(username);
      if (user === undefined) {
        throw new Error("Encontrei um erro!");
      }
      this.users = [user, ...this.users];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(entry) {
    const filteredUsers = this.users.filter(
      (user) => user.login !== entry.login
    );

    this.users = filteredUsers;
    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = document.querySelector("table tbody");

    this.update();
    this.onAdd();
  }

  onAdd() {
    const addUser = this.root.querySelector("#github-search button");
    addUser.addEventListener("click", () => {
      const { value } = this.root.querySelector("#github-search input");
      this.add(value);
    });
  }

  update() {
    this.removeAllTr();

    this.users.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `Imagem do ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector("button.remove").addEventListener("click", () => {
        this.delete(user);
      });

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td class="user">
      <img src="" alt=""/>
      <a href="" target="_blank" class="link_github">
        <p></p>
        <span></span>
      </a>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td><button class="remove">&times;</button></td>`;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
