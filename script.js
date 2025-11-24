// Dados de exemplo (serão substituídos por dados reais do backend)
const modules = {
    construcao: {
        name: 'Construção',
        description: 'Gerenciar acessos ao módulo de Construção',
        permissions: [
            { id: 'view_obras', name: 'Visualizar Obras', description: 'Permite visualizar a lista de obras' },
            { id: 'edit_obras', name: 'Editar Obras', description: 'Permite adicionar, editar e remover obras' },
            { id: 'view_relatorios', name: 'Visualizar Relatórios', description: 'Permite visualizar relatórios de construção' },
            { id: 'gerenciar_equipes', name: 'Gerenciar Equipes', description: 'Permite gerenciar as equipes de obra' }
        ]
    },
    backoffice: {
        name: 'Backoffice',
        description: 'Gerenciar acessos ao módulo de Backoffice',
        permissions: [
            { id: 'view_dashboard', name: 'Visualizar Dashboard', description: 'Permite visualizar o painel administrativo' },
            { id: 'gerenciar_usuarios', name: 'Gerenciar Usuários', description: 'Permite adicionar, editar e remover usuários' },
            { id: 'gerenciar_permissoes', name: 'Gerenciar Permissões', description: 'Permite configurar permissões de acesso' },
            { id: 'config_sistema', name: 'Configurações do Sistema', description: 'Permite alterar configurações gerais do sistema' }
        ]
    }
};

// Elementos do DOM
const configModal = document.getElementById('configModal');
const moduleNameElement = document.getElementById('moduleName');
const configContent = document.getElementById('configContent');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('searchUser');

// Função para abrir o modal de configuração
function configureModule(moduleId) {
    const module = modules[moduleId];
    if (!module) return;

    // Atualiza o título do modal
    moduleNameElement.textContent = module.name;

    // Cria o conteúdo do modal
    let permissionsHTML = `
        <div class="permissions-container">
            <h3>Permissões disponíveis</h3>
            <p class="module-description">${module.description}</p>
            <div class="permissions-list">
    `;

    // Adiciona cada permissão
    module.permissions.forEach(permission => {
        permissionsHTML += `
            <div class="permission-item">
                <label class="permission-checkbox">
                    <input type="checkbox" id="perm_${permission.id}" name="${permission.id}">
                    <span class="checkmark"></span>
                    <div class="permission-info">
                        <span class="permission-name">${permission.name}</span>
                        <span class="permission-desc">${permission.description}</span>
                    </div>
                </label>
            </div>
        `;
    });

    permissionsHTML += `
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeConfigModal()">Cancelar</button>
                <button class="btn-save" onclick="savePermissions('${moduleId}')">Salvar Alterações</button>
            </div>
        </div>
    `;

    // Insere o conteúdo no modal
    configContent.innerHTML = permissionsHTML;
    
    // Exibe o modal
    configModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede o scroll da página
}

// Função para fechar o modal
function closeConfigModal() {
    configModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Reativa o scroll da página
}

// Função para salvar as permissões (será implementada com lógica de backend)
function savePermissions(moduleId) {
    // Aqui você pode adicionar a lógica para salvar as permissões
    console.log(`Salvando permissões para o módulo: ${moduleId}`);
    
    // Exemplo de como obter as permissões selecionadas
    const checkboxes = document.querySelectorAll('.permission-checkbox input[type="checkbox"]');
    const selectedPermissions = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedPermissions.push(checkbox.name);
        }
    });
    
    console.log('Permissões selecionadas:', selectedPermissions);
    
    // Fecha o modal após salvar
    closeConfigModal();
    
    // Exibe mensagem de sucesso
    alert('Permissões salvas com sucesso!');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fecha o modal ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === configModal) {
            closeConfigModal();
        }
    });

    // Fecha o modal ao clicar no botão de fechar
    closeModal.addEventListener('click', closeConfigModal);

    // Adiciona funcionalidade de busca
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Buscando por:', searchTerm);
        // Aqui você pode adicionar a lógica de busca
    });

    // Adiciona funcionalidade ao botão de adicionar usuário
    document.querySelector('.add-user-btn').addEventListener('click', () => {
        alert('Funcionalidade de adicionar usuário será implementada em breve!');
    });

    // Adiciona funcionalidade ao botão de logout
    document.querySelector('.logout-btn').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja sair do sistema?')) {
            // Aqui você pode adicionar a lógica de logout
            console.log('Usuário deslogado');
            alert('Você foi desconectado com sucesso!');
        }
    });
});

// Adiciona estilos dinâmicos para o modal
const style = document.createElement('style');
style.textContent = `
    .permissions-container {
        padding: 0 20px 20px;
    }
    
    .module-description {
        color: #7f8c8d;
        margin-bottom: 20px;
        font-size: 0.95rem;
    }
    
    .permissions-list {
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 10px;
    }
    
    .permission-item {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .permission-item:last-child {
        border-bottom: none;
    }
    
    .permission-checkbox {
        display: flex;
        align-items: flex-start;
        cursor: pointer;
        position: relative;
        padding-left: 35px;
        user-select: none;
    }
    
    .permission-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 22px;
        width: 22px;
        background-color: #f0f0f0;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .permission-checkbox:hover input ~ .checkmark {
        background-color: #e0e0e0;
    }
    
    .permission-checkbox input:checked ~ .checkmark {
        background-color: #3498db;
    }
    
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    .permission-checkbox input:checked ~ .checkmark:after {
        display: block;
    }
    
    .permission-checkbox .checkmark:after {
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    
    .permission-info {
        margin-left: 10px;
    }
    
    .permission-name {
        display: block;
        font-weight: 600;
        margin-bottom: 3px;
        color: #2c3e50;
    }
    
    .permission-desc {
        display: block;
        font-size: 0.85rem;
        color: #7f8c8d;
    }
    
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        margin-top: 20px;
    }
    
    .btn-cancel, .btn-save {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
    }
    
    .btn-cancel {
        background-color: #f0f0f0;
        color: #7f8c8d;
    }
    
    .btn-cancel:hover {
        background-color: #e0e0e0;
    }
    
    .btn-save {
        background-color: #27ae60;
        color: white;
    }
    
    .btn-save:hover {
        background-color: #219653;
    }
`;

document.head.appendChild(style);
