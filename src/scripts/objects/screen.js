const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                            <div class="relacionamentos">
                                                <h2>👥 Seguidores: <span>${user.followers}</span></h2>
                                                <h2>👥 Seguindo: <span>${user.following}</span></h2>
                                            </div>
                                        </div>
                                      </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <ul>
                                                                            <li class="repositories-info">🍴 ${repo.forks}</li>
                                                                            <li class="repositories-info">⭐ ${repo.stargazers_count}</li>
                                                                            <li class="repositories-info">👀 ${repo.watchers}</li>
                                                                            <li class="repositories-info">👨‍💻 ${repo.language}</li>
                                                                        </ul>
                                                                    </a>
                                                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventsItens = ''
        user.events.filter(event => event.type === "PushEvent" || event.type === "CreateEvent").slice(0, 10).forEach(event => {
            eventsItens += `<li>
                                <span>${event.repo.name}</span> -${event.type === "CreateEvent" ? "Novo repositório" : event.payload.commits[0].message}
                            </li>`;
        })

        this.userProfile.innerHTML += ` <div class="events section">
                                            <h2>Events</h2>
                                            <ul>${eventsItens}</ul>
                                        </div>`
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }