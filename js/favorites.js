export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }
  load() {
    this.users = [
      {
        login: "RafaelSilva2k22",
        name: "Rafael Silva",
        public_repos: "76",
        followers: "125",
      },
    ];
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = document.querySelector("table tbody");

    this.update();
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
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".repositories").textContent = user.public_repos;

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td class="user">
      <img
        src=""
        alt=""/>
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
