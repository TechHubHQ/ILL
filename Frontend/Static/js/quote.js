
// Array of quotes
var quotes = [
    {quote: "The only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer", author: "Albert Schweitzer"},
    {quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Believe you can and you're halfway there. – Theodore Roosevelt", author: "Theodore Roosevelt"},
    {quote: "Start where you are. Use what you have. Do what you can. – Arthur Ashe", author: "Arthur Ashe"},
    {quote: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", author: "Sam Levenson"},
    {quote: "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt", author: "Eleanor Roosevelt"},
    {quote: "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar", author: "Zig Ziglar"},
    {quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson", author: "Christian D. Larson"},
    {quote: "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh", author: "Charles Kingsleigh"},
    {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston S. Churchill", author: "Winston S. Churchill"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "It does not matter how slowly you go as long as you do not stop. – Confucius", author: "Confucius"},
    {quote: "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Life is like riding a bicycle. To keep your balance, you must keep moving. – Albert Einstein", author: "Albert Einstein"},
    {quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. – Confucius", author: "Confucius"},
    {quote: "The secret of getting ahead is getting started. – Mark Twain", author: "Mark Twain"},
    {quote: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", author: "Sam Levenson"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt", author: "Eleanor Roosevelt"},
    {quote: "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar", author: "Zig Ziglar"},
    {quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson", author: "Christian D. Larson"},
    {quote: "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh", author: "Charles Kingsleigh"},
    {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston S. Churchill", author: "Winston S. Churchill"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "It does not matter how slowly you go as long as you do not stop. – Confucius", author: "Confucius"},
    {quote: "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Life is like riding a bicycle. To keep your balance, you must keep moving. – Albert Einstein", author: "Albert Einstein"},
    {quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. – Confucius", author: "Confucius"},
    {quote: "The secret of getting ahead is getting started. – Mark Twain", author: "Mark Twain"},
    {quote: "The only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer", author: "Albert Schweitzer"},
    {quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Believe you can and you're halfway there. – Theodore Roosevelt", author: "Theodore Roosevelt"},
    {quote: "Start where you are. Use what you have. Do what you can. – Arthur Ashe", author: "Arthur Ashe"},
    {quote: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", author: "Sam Levenson"},
    {quote: "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt", author: "Eleanor Roosevelt"},
    {quote: "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar", author: "Zig Ziglar"},
    {quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson", author: "Christian D. Larson"},
    {quote: "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh", author: "Charles Kingsleigh"},
    {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston S. Churchill", author: "Winston S. Churchill"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "It does not matter how slowly you go as long as you do not stop. – Confucius", author: "Confucius"},
    {quote: "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Life is like riding a bicycle. To keep your balance, you must keep moving. – Albert Einstein", author: "Albert Einstein"},
    {quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. – Confucius", author: "Confucius"},
    {quote: "The secret of getting ahead is getting started. – Mark Twain", author: "Mark Twain"},
    {quote: "The only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer", author: "Albert Schweitzer"},
    {quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Believe you can and you're halfway there. – Theodore Roosevelt", author: "Theodore Roosevelt"},
    {quote: "Start where you are. Use what you have. Do what you can. – Arthur Ashe", author: "Arthur Ashe"},
    {quote: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", author: "Sam Levenson"},
    {quote: "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt", author: "Eleanor Roosevelt"},
    {quote: "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar", author: "Zig Ziglar"},
    {quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson", author: "Christian D. Larson"},
    {quote: "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh", author: "Charles Kingsleigh"},
    {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston S. Churchill", author: "Winston S. Churchill"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "It does not matter how slowly you go as long as you do not stop. – Confucius", author: "Confucius"},
    {quote: "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Life is like riding a bicycle. To keep your balance, you must keep moving. – Albert Einstein", author: "Albert Einstein"},
    {quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. – Confucius", author: "Confucius"},
    {quote: "The secret of getting ahead is getting started. – Mark Twain", author: "Mark Twain"},
    {quote: "The only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer", author: "Albert Schweitzer"},
    {quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. – Steve Jobs", author: "Steve Jobs"},
    {quote: "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Believe you can and you're halfway there. – Theodore Roosevelt", author: "Theodore Roosevelt"},
    {quote: "Start where you are. Use what you have. Do what you can. – Arthur Ashe", author: "Arthur Ashe"},
    {quote: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", author: "Sam Levenson"},
    {quote: "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt", author: "Eleanor Roosevelt"},
    {quote: "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar", author: "Zig Ziglar"},
    {quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson", author: "Christian D. Larson"},
    {quote: "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh", author: "Charles Kingsleigh"},
    {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston S. Churchill", author: "Winston S. Churchill"},
    {quote: "You are never too old to set another goal or to dream a new dream. – C.S. Lewis", author: "C.S. Lewis"},
    {quote: "It does not matter how slowly you go as long as you do not stop. – Confucius", author: "Confucius"},
    {quote: "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt", author: "Franklin D. Roosevelt"},
    {quote: "Life is like riding a bicycle. To keep your balance, you must keep moving. – Albert Einstein", author: "Albert Einstein"},
    {quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. – Confucius", author: "Confucius"},
    {quote: "The secret of getting ahead is getting started. – Mark Twain", author: "Mark Twain"}
];

        function generateRandomQuote() {
            var randomNumber = Math.floor(Math.random() * quotes.length);
            return quotes[randomNumber];
        }

        var studentTestimonials = document.getElementById('student-testimonials');
        var testimonialHTML = '';

        for (var i = 0; i < 2; i++) { // Generate 2 student testimonials
            var randomQuote = generateRandomQuote();
            testimonialHTML += `
                <blockquote>
                    <p>"${randomQuote.quote}"</p>
                    <cite>- ${randomQuote.author}</cite>
                </blockquote>
            `;
        }

        studentTestimonials.innerHTML = testimonialHTML;