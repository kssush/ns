const tf = require('@tensorflow/tfjs');
const natural = require('natural');

// Данные для обучения
// Увеличиваем данные в 10 раз + разнообразные примеры
const trainingData = [
    // Корпоративные системы (30 примеров)
    { text: 'Разработать корпоративную ERP систему для управления предприятием', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 8 },
    { text: 'Создать систему документооборота для крупной компании', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'Oracle'], specialists: 6 },
    { text: 'Корпоративный портал с интеграцией 1С', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Enterprise система аналитики данных', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Python', 'PostgreSQL'], specialists: 7 },
    { text: 'CRM система для торговой компании', roles: ['Frontend', 'Backend', 'Database'], tech: ['Vue', 'PHP', 'MySQL'], specialists: 4 },
    { text: 'Система управления складом корпоративного уровня', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Платформа для банковских операций', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'Oracle'], specialists: 9 },
    { text: 'ERP система с модулем HR', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 7 },
    { text: 'Система управления проектами для команды', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js'], specialists: 5 },
    { text: 'Интеграция с внешними API для корпоративного портала', roles: ['Backend'], tech: ['Node.js', 'Express'], specialists: 4 },
    { text: 'Система отчетности для финансового анализа', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'MySQL'], specialists: 6 },
    { text: 'Корпоративный сайт с функцией обратной связи', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js'], specialists: 3 },
    { text: 'Система управления клиентами с интеграцией 1С', roles: ['Frontend', 'Backend', 'Database'], tech: ['Vue', 'PHP', 'PostgreSQL'], specialists: 5 },
    { text: 'Система мониторинга производительности сотрудников', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Node.js'], specialists: 4 },
    { text: 'Платформа для управления задачами и проектами', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js'], specialists: 5 },
    { text: 'Система управления запасами для магазина', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'MySQL'], specialists: 6 },
    { text: 'Корпоративный портал для сотрудников', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js'], specialists: 5 },
    { text: 'Система управления документами с функцией поиска', roles: ['Frontend', 'Backend', 'Database'], tech: ['Vue', 'PHP', 'PostgreSQL'], specialists: 4 },
    { text: 'Система управления проектами с функцией отчетности', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Node.js'], specialists: 5 },
    { text: 'Корпоративный сайт с функцией регистрации пользователей', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js'], specialists: 4 },
    { text: 'Система управления клиентами с интеграцией CRM', roles: ['Frontend', 'Backend', 'Database'], tech: ['Vue', 'PHP', 'MySQL'], specialists: 5 },
    { text: 'Система управления проектами с функцией совместной работы', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Node.js'], specialists: 5 },


    // Мобильные приложения (25 примеров)
    { text: 'Разработать мобильное приложение для доставки еды', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
     { text: 'Разработать мобильное приложение для доставки еды', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Создать iOS приложение для фитнес трекера', roles: ['Frontend', 'Backend'], tech: ['Swift', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Android приложение для социальной сети', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['Kotlin', 'Java', 'Figma'], specialists: 6 },
    { text: 'Кроссплатформенное приложение для бронирования отелей', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Python', 'PostgreSQL'], specialists: 5 },
    { text: 'Мобильный банкинг для iOS и Android', roles: ['Frontend', 'Backend', 'Database'], tech: ['React Native', 'Java', 'Oracle'], specialists: 7 },
    { text: 'Приложение для такси с картами и GPS', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Node.js', 'MongoDB'], specialists: 6 },
    { text: 'Создать приложение для отслеживания привычек', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 4 },
    { text: 'Разработать приложение для онлайн-курсов', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Создать приложение для управления финансами', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Java', 'MySQL'], specialists: 4 },
    { text: 'Приложение для планирования путешествий', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Разработать приложение для обмена сообщениями', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Node.js', 'MongoDB'], specialists: 6 },
    { text: 'Создать приложение для отслеживания здоровья', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Мобильное приложение для управления задачами', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Приложение для изучения языков', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Создать приложение для онлайн-игр', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Node.js', 'MongoDB'], specialists: 6 },
    { text: 'Разработать приложение для социальных сетей', roles: ['Frontend', 'Backend', 'UI/UX'], tech: ['React Native', 'Node.js', 'Figma'], specialists: 5 },
    { text: 'Кроссплатформенное приложение для фитнеса', roles: ['Frontend', 'Backend'], tech: ['React Native', 'Python', 'PostgreSQL'], specialists: 5 },
    
    { text: 'Создать приложение для управления проектами',
        roles: ['Frontend', 'Backend', 'UI/UX'],
        tech: ['React Native', 'Node.js', 'Figma'],
        specialists: 6
    },


    // Дашборды и аналитика (20 примеров)
    { text: 'Разработать дашборд для бизнес аналитики', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MongoDB'], specialists: 4 },
    { text: 'Система визуализации данных с графиками', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MySQL'], specialists: 3 },
    { text: 'Дашборд мониторинга в реальном времени', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'Redis'], specialists: 4 },
    { text: 'Платформа для аналитики веб трафика', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'Elasticsearch'], specialists: 5 },
    { text: 'Система отчетности с экспортом в Excel', roles: ['Frontend', 'Backend'], tech: ['React', 'Python', 'PostgreSQL'], specialists: 3 },
    { text: 'Дашборд для анализа продаж', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интерактивная система отчетности', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Python', 'MySQL'], specialists: 5 },
    { text: 'Дашборд для мониторинга социальных медиа', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'Redis'], specialists: 4 },
    { text: 'Система визуализации финансовых данных', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Java', 'PostgreSQL'], specialists: 5 },
    { text: 'Дашборд для анализа пользовательского поведения', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Python', 'MongoDB'], specialists: 4 },
    { text: 'Дашборд для мониторинга производительности', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MySQL'], specialists: 4 },
    { text: 'Система аналитики для интернет-магазина', roles: ['Frontend', 'Backend', 'Database'], tech: ['Vue', 'Python', 'Elasticsearch'], specialists: 5 },
    { text: 'Дашборд для анализа маркетинговых кампаний', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'PostgreSQL'], specialists: 4 },
    { text: 'Система отчетности по KPI', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Python', 'MySQL'], specialists: 5 },
    { text: 'Дашборд для анализа данных о клиентах', roles: ['Frontend', 'Backend'], tech: ['React', 'Python', 'MongoDB'], specialists: 4 },
    { text: 'Дашборд для мониторинга запасов', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'PostgreSQL'], specialists: 4 },
    { text: 'Система визуализации данных о продажах', roles: ['Frontend', 'Backend'], tech: ['React', 'Python', 'MySQL'], specialists: 4 },
    { text: 'Дашборд для анализа конкурентоспособности', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Python', 'Redis'], specialists: 5 },
    { text: 'Система отчетности по расходам', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Дашборд для анализа пользовательского опыта', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Дашборд для мониторинга веб-трафика', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MySQL'], specialists: 4 },
    { text: 'Дашборд для анализа данных о продажах', roles: ['Frontend', 'Backend'], tech: ['Angular', 'Python', 'MongoDB'], specialists: 5 },
    { text: 'Система визуализации данных о клиентах', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'PostgreSQL'], specialists: 4 },
    { text: 'Дашборд для мониторинга эффективности рекламы', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'MySQL'], specialists: 4 },

    // Сайты-визитки и лендинги (15 примеров)
    { text: 'Создать простой сайт-визитку для компании', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг пейдж для продвижения услуги', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для дизайнера', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для запуска продукта', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Создать сайт-визитку для фотографа', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для онлайн-курса', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для художника', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для нового приложения', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Создать сайт-визитку для юриста', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для стартапа', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для веб-разработчика', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для мероприятия', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Создать сайт-визитку для ресторана', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для фитнес-центра', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для видеографа', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для нового продукта', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Создать сайт-визитку для коуча', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для вебинаров', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для иллюстратора', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для запуска книги', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Создать сайт-визитку для психолога', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для онлайн-магазина', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },
    { text: 'Сайт портфолио для музыканта', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'Промо сайт для стартапа', roles: ['Frontend'], tech: ['Vue', 'JavaScript'], specialists: 2 },
    { text: 'Сайт с базой данных', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'PostgreSQL'], specialists: 4 },
    { text: 'Создать сайт-визитку для турагентства', roles: ['Frontend'], tech: ['HTML/CSS', 'JavaScript'], specialists: 1 },
    { text: 'Лендинг для благотворительной организации', roles: ['Frontend', 'UI/UX'], tech: ['HTML/CSS', 'Figma'], specialists: 2 },


    // Электронная коммерция (20 примеров)
    { text: 'Интернет-магазин с каталогом товаров', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа электронной коммерции с оплатой', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс с системой рейтингов', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    { text: 'Система бронирования услуг онлайн', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интернет-магазин одежды', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа для продажи цифровых товаров', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс для местных производителей', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    { text: 'Система бронирования отелей', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интернет-магазин электроники', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа для онлайн-курсов', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс для фрилансеров', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    { text: 'Система бронирования билетов на мероприятия', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интернет-магазин косметики', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа для продажи книг', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс для аренды жилья', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    { text: 'Система бронирования столиков в ресторанах', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интернет-магазин спортивного инвентаря', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа для продажи одежды', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс для товаров ручной работы', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    { text: 'Система бронирования услуг красоты', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Node.js', 'MongoDB'], specialists: 4 },
    { text: 'Интернет-магазин игрушек', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 5 },
    { text: 'Платформа для продажи музыкальных альбомов', roles: ['Frontend', 'Backend', 'Database'], tech: ['Angular', 'Java', 'PostgreSQL'], specialists: 6 },
    { text: 'Маркетплейс для обмена услугами', roles: ['Frontend', 'Backend', 'Database'], tech: ['React', 'Python', 'MySQL'], specialists: 7 },
    
    
    // Стартапы (15 примеров)
    { text: 'Минимальный продукт для стартапа', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для инвесторов', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'MVP социальной платформы', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по доставке', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип мобильного приложения для стартапа', roles: ['Frontend', 'UI/UX'], tech: ['React Native', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для обмена услугами', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по аренде', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип веб-приложения для стартапа', roles: ['Frontend', 'UI/UX'], tech: ['Angular', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для фрилансеров', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по бронированию', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для социальных медиа', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для онлайн-курсов', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по фитнесу', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для управления проектами', roles: ['Frontend', 'UI/UX'], tech: ['Angular', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для краудфандинга', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по кулинарии', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для путешествий', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для обмена знаниями', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по финансам', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для здоровья', roles: ['Frontend', 'UI/UX'], tech: ['Angular', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для онлайн-игр', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по обучению', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },
    { text: 'Прототип приложения для управления задачами', roles: ['Frontend', 'UI/UX'], tech: ['React', 'Figma'], specialists: 2 },
    { text: 'MVP платформы для социальных сетей', roles: ['Frontend', 'Backend'], tech: ['Vue', 'Python', 'PostgreSQL'], specialists: 4 },
    { text: 'Минимальный продукт для приложения по экологии', roles: ['Frontend', 'Backend'], tech: ['React', 'Node.js', 'MongoDB'], specialists: 3 },

];

// Создаем модель TensorFlow для предсказания технологий
class TechPredictor {
    constructor() {
        this.model = null; // будущая модель
        this.vocabulary = []; // словарь уникальных слов из тренировочных данных для векторизации текста
        this.maxLength = 100; // максимальная длина текста
        this.techList = []; // список всех технологий
    }
    
    // Создаем словарь из текстов
    buildVocabulary() {
        const vocabularySet = new Set();
        trainingData.forEach(item => {
            const words = item.text.toLowerCase().split(/\s+/);
            words.forEach(word => vocabularySet.add(word));
        });
        this.vocabulary = Array.from(vocabularySet);
        
        // Собираем все уникальные технологии
        const allTechs = new Set();
        trainingData.forEach(item => {
            item.tech.forEach(tech => allTechs.add(tech));
        });
        this.techList = Array.from(allTechs);
    }
    
    // Векторизация текста
    textToVector(text) {
        const words = text.toLowerCase().split(/\s+/);
        const vector = new Array(this.vocabulary.length).fill(0);
        
        words.forEach(word => {
            const index = this.vocabulary.indexOf(word);
            if (index !== -1) {
                vector[index] = 1;
            }
        });
        
        return vector;
    }
    
    // Подготовка данных для обучения - тензоры и тд
    prepareTrainingData() {
        const texts = trainingData.map(item => this.textToVector(item.text));
        const techs = trainingData.map(item => {
            const vector = new Array(this.techList.length).fill(0);
            item.tech.forEach(tech => {
                const index = this.techList.indexOf(tech);
                if (index !== -1) {
                    vector[index] = 1;
                }
            });
            return vector;
        });
        
        return {
            texts: tf.tensor2d(texts),
            techs: tf.tensor2d(techs)
        };
    }
    
    // Создание и обучение модели
    async createModel() {
        console.log('🔄 Создаем словарь...');
        this.buildVocabulary();
        
        console.log('🔄 Подготавливаем данные...');
        const { texts, techs } = this.prepareTrainingData();
        
        console.log('🔄 Создаем модель TensorFlow...');
        this.model = tf.sequential({
            layers: [
                tf.layers.dense({ 
                    inputShape: [this.vocabulary.length], 
                    units: 64, 
                    activation: 'relu' 
                }),
                tf.layers.dropout({ rate: 0.3 }),
                tf.layers.dense({ units: 32, activation: 'relu' }),
                tf.layers.dense({ 
                    units: this.techList.length, 
                    activation: 'sigmoid' 
                })
            ]
        });
        
        this.model.compile({
            optimizer: 'adam',
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
        
        console.log('🔄 Обучаем модель...');
        await this.model.fit(texts, techs, {
            epochs: 500,
            batchSize: 4,
            validationSplit: 0.2,
            verbose: 0
        });
        
        console.log('✅ ML модель обучена!');
    }
    
    // Улучшенное предсказание с приоритетами
    predictOptimalTechs(text, role, foundRoles) {
        if (!this.model) {
            console.log('⚠️  Модель не обучена, используем правила');
            return this.getDefaultTechs(role, text.toLowerCase());
        }
        
        const vector = this.textToVector(text);
        const prediction = this.model.predict(tf.tensor2d([vector]));
        const results = prediction.dataSync();
        
        const predictedTechs = [];
        results.forEach((score, index) => {
            if (score > 0.3) {
                predictedTechs.push({
                    tech: this.techList[index],
                    confidence: score,
                    role: getTechRole(this.techList[index])
                });
            }
        });
        
        // Фильтруем по роли и сортируем по уверенности
        const roleTechs = predictedTechs
            .filter(item => item.role === role)
            .sort((a, b) => b.confidence - a.confidence);
        
        return this.selectOptimalTechs(roleTechs, role, text.toLowerCase(), foundRoles);
    }
    
    // Выбираем оптимальные технологии
    selectOptimalTechs(techs, role, textLower, allRoles) {
        // В первую очередь проверяем явные указания в тексте
        if (textLower.includes('kotlin') && role === 'Frontend') {
            return ['Kotlin'];
        }
        if ((textLower.includes('html') || textLower.includes('визитка')) && role === 'Frontend') {
            return ['HTML/CSS'];
        }
        
        if (techs.length === 0) return this.getDefaultTechs(role, textLower);
        
        const optimalTechs = [];
        const usedCategories = new Set();
        
        const projectType = this.detectProjectType(textLower);
        
        for (const tech of techs) {
            if (optimalTechs.length >= this.getMaxTechsPerRole(role, projectType)) break;
            
            const category = this.getTechCategory(tech.tech);
            
            if (!this.hasConflicts(tech.tech, optimalTechs, allRoles) &&
                !usedCategories.has(category)) {
                
                optimalTechs.push(tech.tech);
                usedCategories.add(category);
            }
        }
        
        if (optimalTechs.length === 0 && techs.length > 0) {
            return [techs[0].tech];
        }
        
        return optimalTechs;
    }
    
    // Определяем тип проекта
    detectProjectType(textLower) {
        if (textLower.includes('корпоратив') || textLower.includes('enterprise')) return 'enterprise';
        if (textLower.includes('стартап') || textLower.includes('мвп')) return 'startup';
        if (textLower.includes('мобильн') || textLower.includes('ios') || textLower.includes('android') || textLower.includes('kotlin')) return 'mobile';
        if (textLower.includes('дашборд') || textLower.includes('аналитик')) return 'analytics';
        if (textLower.includes('сайт-визитка') || textLower.includes('визитка') || textLower.includes('html')) return 'website';
        if (textLower.includes('интернет магазин') || textLower.includes('e-commerce')) return 'ecommerce';
        return 'general';
    }
    
    // Максимальное количество технологий на роль
    getMaxTechsPerRole(role, projectType) {
        const limits = {
            'enterprise': { 'Frontend': 2, 'Backend': 2, 'Database': 1, 'UI/UX': 1 },
            'startup': { 'Frontend': 1, 'Backend': 1, 'Database': 1, 'UI/UX': 1 },
            'mobile': { 'Frontend': 1, 'Backend': 1, 'Database': 1, 'UI/UX': 1 },
            'website': { 'Frontend': 1, 'Backend': 1, 'Database': 1, 'UI/UX': 1 },
            'general': { 'Frontend': 1, 'Backend': 1, 'Database': 1, 'UI/UX': 1 }
        };
        return limits[projectType]?.[role] || 1;
    }
    
    // Категории технологий
    getTechCategory(tech) {
        const categories = {
            'react': 'frontend-framework', 'vue': 'frontend-framework', 'angular': 'frontend-framework',
            'react native': 'mobile-framework', 'swift': 'mobile-native', 'kotlin': 'mobile-native',
            'node.js': 'backend-language', 'python': 'backend-language', 'java': 'backend-language',
            'html/css': 'frontend-basic',
            'mongodb': 'database-nosql', 'postgresql': 'database-sql', 'mysql': 'database-sql'
        };
        return categories[tech.toLowerCase()] || 'other';
    }
    
    // Проверка конфликтов технологий
    hasConflicts(newTech, existingTechs, allRoles) {
        const conflicts = {
            'react native': ['swift', 'kotlin'],
            'swift': ['react native', 'kotlin'],
            'kotlin': ['react native', 'swift'],
            'angular': ['vue'], 'vue': ['angular'],
            'mongodb': ['oracle'], 'oracle': ['mongodb'],
            'html/css': ['react', 'vue', 'angular'] // HTML/CSS не совместим с фреймворками
        };
        
        if (conflicts[newTech.toLowerCase()]) {
            return existingTechs.some(existing => 
                conflicts[newTech.toLowerCase()].includes(existing.toLowerCase())
            );
        }
        return false;
    }
    
    // Технологии по умолчанию
    getDefaultTechs(role, textLower) {
        const projectType = this.detectProjectType(textLower);
        
        const defaultTechs = {
            'enterprise': {
                'Frontend': ['Angular'], 'Backend': ['Java'], 'Database': ['PostgreSQL'], 'UI/UX': ['Figma']
            },
            'startup': {
                'Frontend': ['React'], 'Backend': ['Node.js'], 'Database': ['MongoDB'], 'UI/UX': ['Figma']
            },
            'mobile': {
                'Frontend': ['Kotlin'], 'Backend': ['Node.js'], 'Database': ['MongoDB'], 'UI/UX': ['Figma']
            },
            'website': {
                'Frontend': ['HTML/CSS'], 'Backend': ['Node.js'], 'Database': ['MongoDB'], 'UI/UX': ['Figma']
            },
            'general': {
                'Frontend': ['React'], 'Backend': ['Node.js'], 'Database': ['MongoDB'], 'UI/UX': ['Figma']
            }
        };
        
        return defaultTechs[projectType]?.[role] || [role + ' специалист'];
    }
}

// Функция определения роли для технологии
const getTechRole = (tech) => {
    const techRoles = {
        'Frontend': ['React', 'Vue', 'Angular', 'JavaScript', 'HTML/CSS', 'React Native', 'Swift', 'Kotlin'],
        'Backend': ['Node.js', 'Python', 'Java', 'PHP'],
        'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle'],
        'UI/UX': ['Figma', 'Sketch', 'Adobe XD']
    };
    
    for (const [role, techs] of Object.entries(techRoles)) {
        if (techs.includes(tech)) return role;
    }
    return 'Other';
};

// Инициализируем ML модель
const techPredictor = new TechPredictor();

// Обучаем классификаторы natural
const roleClassifier = new natural.BayesClassifier();
const techClassifier = new natural.BayesClassifier();

trainingData.forEach(item => {
    const textLower = item.text.toLowerCase();
    item.roles.forEach(role => roleClassifier.addDocument(textLower, role));
    item.tech.forEach(tech => techClassifier.addDocument(textLower, tech));
});

roleClassifier.train();
techClassifier.train();

// Улучшенный классификатор направлений
const classifyRoles = (text) => {
    const textLower = text.toLowerCase();
    const foundRoles = new Set();
    
    // Явные правила для Kotlin проектов
    if (textLower.includes('kotlin') || (textLower.includes('мобильное') && textLower.includes('приложение'))) {
        foundRoles.add('Frontend');
    }
    
    // Явные правила для HTML проектов
    if (textLower.includes('html') || textLower.includes('сайт-визитка') || textLower.includes('визитка')) {
        foundRoles.add('Frontend');
    }
    
    // Используем классификатор
    const classifiedRole = roleClassifier.classify(textLower);
    if (classifiedRole !== 'none') foundRoles.add(classifiedRole);
    
    // Контекстное определение
    const contextPatterns = {
        'корпоративн': ['Frontend', 'Backend', 'Database'],
        'мобильн': ['Frontend'],
        'дашборд': ['Frontend', 'Backend'],
        'аналитик': ['Frontend', 'Backend', 'Database'],
        'интернет магазин': ['Frontend', 'Backend', 'Database'],
        'стартап': ['Frontend', 'Backend'],
        'лендинг': ['Frontend'],
        'сайт визитка': ['Frontend']
    };
    
    Object.entries(contextPatterns).forEach(([pattern, roles]) => {
        if (textLower.includes(pattern)) {
            roles.forEach(role => foundRoles.add(role));
        }
    });
    
    return Array.from(foundRoles);
};

// Улучшенный классификатор технологий
const classifyTech = async (text, role, allRoles) => {
    const textLower = text.toLowerCase();
    
    // ПРИОРИТЕТ 1: ЯВНЫЕ УКАЗАНИЯ В ТЕКСТЕ (самый высокий приоритет)
    const explicitTechMatches = [
        { pattern: 'react native', tech: 'React Native' },
        { pattern: 'react-native', tech: 'React Native' },
        { pattern: 'react native', tech: 'React Native' },
        { pattern: 'kotlin', tech: 'Kotlin' },
        { pattern: 'swift', tech: 'Swift' },
        { pattern: 'angular', tech: 'Angular' },
        { pattern: 'vue', tech: 'Vue' },
        { pattern: 'html', tech: 'HTML/CSS' },
        { pattern: 'node.js', tech: 'Node.js' },
        { pattern: 'python', tech: 'Python' },
        { pattern: 'java', tech: 'Java' }
    ];
    
    for (const {pattern, tech} of explicitTechMatches) {
        if (textLower.includes(pattern) && getTechRole(tech) === role) {
            console.log(`✅ Обнаружено явное указание технологии: ${tech}`);
            return [tech];
        }
    }
    
    // ПРИОРИТЕТ 2: Контекстные правила с учетом явных указаний
    if (textLower.includes('мобильное') && textLower.includes('приложение')) {
        // Если явно указан React Native - используем его
        if (textLower.includes('react native') && role === 'Frontend') {
            return ['React Native'];
        }
        // Для мобильных приложений без явного указания - используем ML
    }
    
    // ПРИОРИТЕТ 3: ML предсказание
    const mlPredictions = await techPredictor.predictOptimalTechs(text, role, allRoles);
    return optimizeTechSelection(mlPredictions, role, textLower);
};

// Улучшенная функция оптимизации выбора
// Улучшенная функция оптимизации выбора технологий
const optimizeTechSelection = (techs, role, textLower) => {
    if (techs.length === 0) {
        // Fallback для мобильных приложений
        if (textLower.includes('мобильное') && role === 'Frontend') {
            return ['React Native']; // Более универсальный выбор чем Kotlin
        }
        return [role + ' специалист'];
    }
    
    // Приоритет для React Native в мобильных проектах
    if (textLower.includes('мобильное') && role === 'Frontend') {
        if (techs.includes('React Native')) {
            return ['React Native'];
        }
        // Если React Native не найден, но есть другие мобильные технологии
        const mobileTechs = techs.filter(tech => 
            ['React Native', 'Kotlin', 'Swift'].includes(tech)
        );
        if (mobileTechs.length > 0) {
            return [mobileTechs[0]];
        }
    }
    
    return techs.slice(0, 1); // Берем первую (наиболее подходящую) технологию
};


// Определение типа проекта
const detectProjectType = (textLower) => {
    if (textLower.includes('корпоратив')) return 'enterprise';
    if (textLower.includes('стартап')) return 'startup';
    if (textLower.includes('мобильн') || textLower.includes('kotlin')) return 'mobile';
    if (textLower.includes('сайт-визитка') || textLower.includes('визитка') || textLower.includes('html')) return 'website';
    if (textLower.includes('дашборд')) return 'analytics';
    return 'general';
};

// Оценка команды
const estimateTeam = (text, role, tech) => {
    const textLower = text.toLowerCase();
    const projectType = detectProjectType(textLower);
    
    const baseEstimates = {
        'Frontend': { 
            'React': 2, 'Vue': 2, 'Angular': 3, 
            'React Native': 3, 'Swift': 2, 'Kotlin': 2,
            'HTML/CSS': 1 
        },
        'Backend': { 'Node.js': 2, 'Python': 3, 'Java': 3, 'PHP': 2 },
        'Database': { 'MongoDB': 1, 'PostgreSQL': 2, 'MySQL': 2 },
        'UI/UX': { 'Figma': 1 }
    };
    
    let baseCount = baseEstimates[role]?.[tech] || 1;
    
    // Модификаторы
    const modifiers = {
        'enterprise': 1.5, 'startup': 0.8, 'mobile': 1.2, 'website': 0.7, 'general': 1.0
    };
    
    baseCount *= modifiers[projectType] || 1.0;
    
    if (textLower.includes('сложн')) baseCount *= 1.3;
    if (textLower.includes('прост')) baseCount *= 0.7;
    
    return Math.max(1, Math.round(baseCount));
};

// Основная функция
const analyzeRequirements = async (text) => {
    console.log(`🔍 Анализируем ТЗ: "${text}"\n`);
    
    const roles = classifyRoles(text);
    
    if (roles.length === 0) {
        console.log('❌ Не удалось определить направления');
        return;
    }
    
    console.log(`🎯 Направления: ${roles.join(', ')}`);
    
    const results = [];
    let totalSpecialists = 0;
    
    for (const role of roles) {
        const techs = await classifyTech(text, role, roles);
        
        console.log(`\n📋 ${role}:`);
        
        techs.forEach(tech => {
            const specialists = estimateTeam(text, role, tech);
            totalSpecialists += specialists;
            results.push({ role, tech, specialists });
            
            console.log(`   🛠️  ${tech} → 👥 ${specialists} чел.`);
        });
    }
    
    console.log(`\n📊 Всего специалистов: ${totalSpecialists}`);
    return results;
};

// Тестирование
const main = async () => {
    console.log('🚀 Запуск анализатора...\n');
    
    try {
        await techPredictor.createModel();
        
        const testCases = [
            'Стартап проект для управления задачами на Vue',
            'Корпоративная CRM система с интеграциями',
            'Мобильное банковское приложение на Kotlin',
            'Мобильное банковское приложение',
            'Мобильное банковское приложение на Swift',
            'Простой сайт-визитка компании',
            'Сайт для курсовой работы с базой данных'
        ];
        
        for (let i = 0; i < testCases.length; i++) {
            console.log(`\n${'='.repeat(50)}`);
            console.log(`📄 ТЕСТ ${i + 1}: ${testCases[i]}`);
            console.log('='.repeat(50));
            await analyzeRequirements(testCases[i]);
        }
        
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }
};

// Запуск
main().catch(console.error);