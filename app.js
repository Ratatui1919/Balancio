// ========== MODALS ==========
const Modals = {
    openGoalModal(goal = null) {
        const modal = document.getElementById('goalModal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-bullseye"></i> ${goal ? 'Редагувати' : 'Нова'} ціль</h2>
                <input type="text" class="modal-input" id="goalName" placeholder="Назва цілі" value="${goal?.name || ''}">
                <select class="modal-select" id="goalCurrency">
                    <option value="UAH" ${goal?.currency === 'UAH' ? 'selected' : ''}>🇺🇦 Гривня</option>
                    <option value="EUR" ${goal?.currency === 'EUR' ? 'selected' : ''}>🇪🇺 Євро</option>
                    <option value="USD" ${goal?.currency === 'USD' ? 'selected' : ''}>🇺🇸 Долар</option>
                </select>
                <input type="number" class="modal-input" id="goalTarget" placeholder="Цільова сума" value="${goal?.target || ''}">
                <div class="modal-buttons">
                    <button class="modal-btn create" onclick="Modals.saveGoal('${goal?.id || ''}')">${goal ? 'Зберегти' : 'Створити'}</button>
                    <button class="modal-btn cancel" onclick="Modals.closeModal('goalModal')">Скасувати</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },
    
    openTransactionModal(currency, transaction = null) {
        const modal = document.getElementById('transactionModal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-exchange-alt"></i> ${transaction ? 'Редагувати' : 'Нова'} операція</h2>
                <input type="hidden" id="transactionCurrency" value="${currency}">
                <select class="modal-select" id="transactionType" onchange="Modals.updateCategoryButtons()">
                    <option value="income" ${transaction?.type === 'income' ? 'selected' : ''}>💰 Дохід</option>
                    <option value="expense" ${transaction?.type === 'expense' ? 'selected' : ''}>💸 Витрата</option>
                </select>
                
                <div class="category-buttons" id="categoryButtons"></div>

                <input type="text" class="modal-input" id="transactionDesc" placeholder="Опис" value="${transaction?.description || ''}">
                <input type="number" class="modal-input" id="transactionAmount" placeholder="Сума" value="${transaction?.amount || ''}">
                
                <div class="modal-buttons">
                    <button class="modal-btn create" onclick="Modals.saveTransaction('${transaction?.id || ''}')">${transaction ? 'Зберегти' : 'Додати'}</button>
                    <button class="modal-btn cancel" onclick="Modals.closeModal('transactionModal')">Скасувати</button>
                </div>
            </div>
        `;
        
        this.updateCategoryButtons(transaction?.category);
        modal.classList.add('active');
    },
    
    openBankModal(account = null) {
        const modal = document.getElementById('bankModal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-wallet"></i> ${account ? 'Редагувати' : 'Новий'} рахунок</h2>
                <input type="text" class="modal-input" id="bankName" placeholder="Назва рахунку" value="${account?.name || ''}">
                <select class="modal-select" id="bankCurrency">
                    <option value="UAH" ${account?.currency === 'UAH' ? 'selected' : ''}>🇺🇦 Гривня</option>
                    <option value="EUR" ${account?.currency === 'EUR' ? 'selected' : ''}>🇪🇺 Євро</option>
                    <option value="USD" ${account?.currency === 'USD' ? 'selected' : ''}>🇺🇸 Долар</option>
                </select>
                <input type="number" class="modal-input" id="bankBalance" placeholder="Поточний баланс" value="${account?.balance || ''}">
                <div class="modal-buttons">
                    <button class="modal-btn create" onclick="Modals.saveBank('${account?.id || ''}')">${account ? 'Зберегти' : 'Додати'}</button>
                    <button class="modal-btn cancel" onclick="Modals.closeModal('bankModal')">Скасувати</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },
    
    openRecurringModal(payment = null) {
        const modal = document.getElementById('recurringModal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-clock"></i> ${payment ? 'Редагувати' : 'Новий'} платіж</h2>
                <input type="text" class="modal-input" id="recurringName" placeholder="Назва" value="${payment?.name || ''}">
                <input type="number" class="modal-input" id="recurringAmount" placeholder="Сума" value="${payment?.amount || ''}">
                <select class="modal-select" id="recurringCurrency">
                    <option value="UAH" ${payment?.currency === 'UAH' ? 'selected' : ''}>🇺🇦 Гривня</option>
                    <option value="EUR" ${payment?.currency === 'EUR' ? 'selected' : ''}>🇪🇺 Євро</option>
                    <option value="USD" ${payment?.currency === 'USD' ? 'selected' : ''}>🇺🇸 Долар</option>
                </select>
                <select class="modal-select" id="recurringFrequency">
                    <option value="Щомісяця" ${payment?.frequency === 'Щомісяця' ? 'selected' : ''}>Щомісяця</option>
                    <option value="Щокварталу" ${payment?.frequency === 'Щокварталу' ? 'selected' : ''}>Щокварталу</option>
                    <option value="Щороку" ${payment?.frequency === 'Щороку' ? 'selected' : ''}>Щороку</option>
                </select>
                <input type="text" class="modal-input" id="recurringDay" placeholder="День платежу" value="${payment?.day || ''}">
                <input type="text" class="modal-input" id="recurringCategory" placeholder="Категорія" value="${payment?.category || ''}">
                <div class="modal-buttons">
                    <button class="modal-btn create" onclick="Modals.saveRecurring('${payment?.id || ''}')">${payment ? 'Зберегти' : 'Додати'}</button>
                    <button class="modal-btn cancel" onclick="Modals.closeModal('recurringModal')">Скасувати</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },
    
    openBudgetModal() {
        const modal = document.getElementById('budgetModal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-chart-pie"></i> Налаштувати бюджет</h2>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    Функція налаштування бюджету буде доступна найближчим часом!
                </p>
                <div class="modal-buttons">
                    <button class="modal-btn cancel" onclick="Modals.closeModal('budgetModal')">Закрити</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    },
    
    updateCategoryButtons(selectedCategory = null) {
        const typeSelect = document.getElementById('transactionType');
        if (!typeSelect) return;
        
        const type = typeSelect.value;
        const categories = Categories.getByType(type);
        const container = document.getElementById('categoryButtons');
        
        if (!container) return;
        
        container.innerHTML = categories.map(cat => `
            <button class="category-btn ${selectedCategory === cat ? 'selected' : ''}" data-category="${cat}">
                <i class="fas ${Categories.icons[cat]}"></i> ${Categories.translations[cat]}
            </button>
        `).join('');
        
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                AppState.ui.selectedCategory = btn.dataset.category;
            });
        });
    },
    
    saveGoal(id) {
        const nameInput = document.getElementById('goalName');
        const currencySelect = document.getElementById('goalCurrency');
        const targetInput = document.getElementById('goalTarget');
        
        if (!nameInput || !currencySelect || !targetInput) return;
        
        const name = nameInput.value.trim();
        const currency = currencySelect.value;
        const target = parseFloat(targetInput.value);
        
        if (!name || isNaN(target) || target <= 0) {
            return alert('Введіть назву та суму');
        }
        
        if (id) {
            const goal = AppState.data.goals.find(g => g.id === id);
            if (goal) {
                goal.name = name;
                goal.currency = currency;
                goal.target = target;
            }
        } else {
            AppState.data.goals.push({
                id: Helpers.generateId(),
                name,
                currency,
                target,
                saved: 0,
                completed: false,
                history: []
            });
        }
        
        AppState.save();
        this.closeModal('goalModal');
        if (typeof GoalsPage !== 'undefined') {
            GoalsPage.render();
        }
    },
    
    saveTransaction(id) {
        const currencyInput = document.getElementById('transactionCurrency');
        const typeSelect = document.getElementById('transactionType');
        const descInput = document.getElementById('transactionDesc');
        const amountInput = document.getElementById('transactionAmount');
        
        if (!currencyInput || !typeSelect || !descInput || !amountInput) return;
        
        const currency = currencyInput.value;
        const type = typeSelect.value;
        const desc = descInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = AppState.ui.selectedCategory;
        
        if (!category) return alert('Виберіть категорію');
        if (isNaN(amount) || amount <= 0) return alert('Введіть коректну суму');
        
        if (!AppState.data.transactions[currency]) {
            AppState.data.transactions[currency] = [];
        }
        
        if (id) {
            const index = AppState.data.transactions[currency].findIndex(t => t.id === id);
            if (index !== -1) {
                AppState.data.transactions[currency][index] = {
                    ...AppState.data.transactions[currency][index],
                    type,
                    description: desc || '-',
                    category,
                    amount
                };
            }
        } else {
            AppState.data.transactions[currency].push({
                id: Helpers.generateId(),
                type,
                description: desc || '-',
                category,
                amount,
                date: Date.now(),
                month: Helpers.getMonthKey(AppState.ui.currentMonth)
            });
        }
        
        AppState.save();
        this.closeModal('transactionModal');
        if (typeof JournalPage !== 'undefined') {
            JournalPage.render();
        }
    },
    
    saveBank(id) {
        const nameInput = document.getElementById('bankName');
        const currencySelect = document.getElementById('bankCurrency');
        const balanceInput = document.getElementById('bankBalance');
        
        if (!nameInput || !currencySelect || !balanceInput) return;
        
        const name = nameInput.value.trim();
        const currency = currencySelect.value;
        const balance = parseFloat(balanceInput.value);
        
        if (!name || isNaN(balance)) return alert('Заповніть всі поля');
        
        if (id) {
            const account = AppState.data.bankAccounts.find(a => a.id === id);
            if (account) {
                account.name = name;
                account.currency = currency;
                account.balance = balance;
            }
            AppState.save();
        } else {
            AppState.data.bankAccounts.push({
                id: Helpers.generateId(),
                name,
                currency,
                balance,
                icon: BankPage.getRandomIcon()
            });
            AppState.save();
        }
        
        this.closeModal('bankModal');
        if (typeof BankPage !== 'undefined') {
            BankPage.render();
        }
    },
    
    saveRecurring(id) {
        const nameInput = document.getElementById('recurringName');
        const amountInput = document.getElementById('recurringAmount');
        const currencySelect = document.getElementById('recurringCurrency');
        const frequencySelect = document.getElementById('recurringFrequency');
        const dayInput = document.getElementById('recurringDay');
        const categoryInput = document.getElementById('recurringCategory');
        
        if (!nameInput || !amountInput || !currencySelect || !frequencySelect || !dayInput || !categoryInput) return;
        
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const currency = currencySelect.value;
        const frequency = frequencySelect.value;
        const day = dayInput.value;
        const category = categoryInput.value;
        
        if (!name || isNaN(amount) || !day || !category) {
            return alert('Заповніть всі поля');
        }
        
        const data = { name, amount, currency, frequency, day, category };
        
        if (id) {
            const index = AppState.data.recurringPayments.findIndex(p => p.id === id);
            if (index !== -1) {
                AppState.data.recurringPayments[index] = { ...AppState.data.recurringPayments[index], ...data };
            }
        } else {
            AppState.data.recurringPayments.push({
                id: Helpers.generateId(),
                ...data
            });
        }
        
        AppState.save();
        this.closeModal('recurringModal');
        if (typeof RecurringPage !== 'undefined') {
            RecurringPage.render();
        }
    }
};

// ========== FEATURES GRID ==========
const FeaturesGrid = {
    items: [
        { icon: 'fa-hand-holding-heart', title: 'Борги', desc: 'Відстежуйте, хто вам винен і кому винні ви' },
        { icon: 'fa-bullseye', title: 'Цілі', desc: 'Ставте фінансові цілі та досягайте їх' },
        { icon: 'fa-book-open', title: 'Щоденник', desc: 'Записуйте доходи та витрати' },
        { icon: 'fa-wallet', title: 'Мій банк', desc: 'Всі рахунки в одному місці' },
        { icon: 'fa-chart-pie', title: 'Бюджет', desc: 'Плануйте витрати та контролюйте їх' },
        { icon: 'fa-clock', title: 'Регулярні', desc: 'Автоматичні платежі та підписки' }
    ],
    
    render() {
        const container = document.getElementById('featuresGrid');
        if (!container) return;
        
        const html = this.items.map(item => `
            <div class="feature-card">
                <div class="feature-icon"><i class="fas ${item.icon}"></i></div>
                <div class="feature-title">${item.title}</div>
                <div class="feature-desc">${item.desc}</div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    }
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    
    // Отримуємо DOM елементи
    const landingPage = document.getElementById('landingPage');
    const mainApp = document.getElementById('mainApp');
    const landingLoginBtn = document.getElementById('landingLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userEmailSpan = document.querySelector('#userEmail span');
    const refreshIndicator = document.getElementById('refreshIndicator');
    
    // Перевіряємо чи всі елементи знайдені
    console.log('Elements found:', { 
        landingPage: !!landingPage, 
        mainApp: !!mainApp, 
        landingLoginBtn: !!landingLoginBtn,
        logoutBtn: !!logoutBtn,
        userEmailSpan: !!userEmailSpan
    });
    
    FeaturesGrid.render();
    
    if (typeof Navigation !== 'undefined') {
        Navigation.render();
    }
    
    // Завантажуємо збережену тему
    const savedTheme = localStorage.getItem('balancio-theme');
    const savedAccent = localStorage.getItem('balancio-accent');
    if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
    if (savedAccent) document.body.setAttribute('data-accent', savedAccent);
    
    // Функція для показу індикатора оновлення
    window.showRefresh = () => {
        if (refreshIndicator) {
            refreshIndicator.classList.add('active');
            setTimeout(() => refreshIndicator.classList.remove('active'), 1000);
        }
    };
    
    // Auth listeners
    if (landingLoginBtn) {
        landingLoginBtn.addEventListener('click', () => {
            console.log('Login button clicked');
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(result => {
                    console.log('Login successful:', result.user.email);
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Помилка входу: ' + error.message);
                });
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('Logged out');
            });
        });
    }
    
    auth.onAuthStateChanged(user => {
        console.log('Auth state changed:', user ? 'Logged in as ' + user.email : 'Logged out');
        
        if (user) {
            AppState.user = user;
            if (userEmailSpan) userEmailSpan.textContent = user.email;
            if (landingPage) landingPage.style.display = 'none';
            if (mainApp) mainApp.style.display = 'block';
            if (typeof AppState.load === 'function') {
                AppState.load(user.uid);
            }
        } else {
            AppState.user = null;
            if (landingPage) landingPage.style.display = 'block';
            if (mainApp) mainApp.style.display = 'none';
        }
    });
});

// Експортуємо все в глобальний об'єкт window
window.Modals = Modals;
window.FeaturesGrid = FeaturesGrid;
