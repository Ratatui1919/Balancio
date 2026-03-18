// ========== FIREBASE CONFIG ==========
const firebaseConfig = {
    apiKey: "AIzaSyD6hldl2mZS1xZe1Z8ZERWM19kpCjAqfwQ",
    authDomain: "borgi-60d8d.firebaseapp.com",
    databaseURL: "https://borgi-60d8d-default-rtdb.firebaseio.com",
    projectId: "borgi-60d8d",
    storageBucket: "borgi-60d8d.firebasestorage.app",
    messagingSenderId: "361694792367",
    appId: "1:361694792367:web:ccbfc861668a568e1e225a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ========== GLOBAL STATE ==========
const AppState = {
    user: null,
    data: {
        goals: [],
        debts: { owed: [], owe: [] },
        transactions: { EUR: [], UAH: [] },
        bankAccounts: [],
        budgets: {},
        recurringPayments: []
    },
    ui: {
        currentMonth: new Date(),
        currentCurrency: 'EUR',
        selectedCategory: null
    },
    
    // Методи для роботи з даними
    async save() {
        if (!this.user) return;
        showRefresh();
        try {
            await database.ref('users/' + this.user.uid).set(this.data);
        } catch (error) {
            console.error('Save error:', error);
        }
    },
    
    async load(uid) {
        database.ref('users/' + uid).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.data = this.migrateData(data);
            }
            // Оновлюємо всі сторінки
            if (typeof updateAllPages === 'function') {
                updateAllPages();
            }
        });
    },
    
    migrateData(data) {
        // Міграція старих даних в новий формат
        if (data.goals) {
            data.goals = data.goals.map(goal => ({
                ...goal,
                completed: goal.completed || goal.saved >= goal.target,
                completedDate: goal.completedDate || (goal.saved >= goal.target ? Date.now() : null),
                history: goal.history || []
            }));
        }
        
        return {
            goals: data.goals || [],
            debts: data.debts || { owed: [], owe: [] },
            transactions: data.transactions || { EUR: [], UAH: [] },
            bankAccounts: data.bankAccounts || [],
            budgets: data.budgets || {},
            recurringPayments: data.recurringPayments || []
        };
    }
};

// ========== CATEGORIES ==========
const Categories = {
    translations: {
        'salary': 'Зарплата',
        'gift': 'Подарунок',
        'freelance': 'Підробіток',
        'investment': 'Інвестиції',
        'food': 'Їжа',
        'transport': 'Транспорт',
        'health': 'Здоров\'я',
        'clothes': 'Одяг',
        'entertainment': 'Розваги',
        'cigarettes': 'Цигарки',
        'alcohol': 'Алкоголь',
        'other': 'Інше'
    },
    
    icons: {
        'salary': 'fa-briefcase',
        'gift': 'fa-gift',
        'freelance': 'fa-laptop',
        'investment': 'fa-chart-line',
        'food': 'fa-utensils',
        'transport': 'fa-bus',
        'health': 'fa-heartbeat',
        'clothes': 'fa-tshirt',
        'entertainment': 'fa-film',
        'cigarettes': 'fa-smoking',
        'alcohol': 'fa-wine-bottle',
        'other': 'fa-ellipsis'
    },
    
    getByType(type) {
        return type === 'income' 
            ? ['salary', 'gift', 'freelance', 'investment', 'other']
            : ['food', 'transport', 'health', 'clothes', 'entertainment', 'cigarettes', 'alcohol', 'other'];
    }
};
