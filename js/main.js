document.addEventListener('DOMContentLoaded', function () {

    // --- LOGIC FOR TABS on guide.html ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate all first
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate the one that was clicked
                button.classList.add('active');
                const targetContent = document.getElementById(button.dataset.unit);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // --- LOGIC FOR ACCORDIONS on guide.html ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const currentItem = this.parentElement; // The .accordion-item
                const accordionContainer = currentItem.parentElement; // The .accordion container
                const wasActive = currentItem.classList.contains('active');

                // If inside a valid accordion container, close all other items first
                if (accordionContainer.classList.contains('accordion')) {
                    accordionContainer.querySelectorAll('.accordion-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
                
                // If the item was not active, make it active.
                // This creates the "one-at-a-time" accordion effect.
                if (!wasActive) {
                    currentItem.classList.add('active');
                }
            });
        });
    }


    // --- QUIZ LOGIC (for quiz.html page) ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const quizSelectionDiv = document.getElementById('quiz-selection');
        const quizArea = document.getElementById('quiz-area');
        const nextBtn = document.getElementById('next-btn');
        const resultArea = document.getElementById('result-area');
        const scoreText = document.getElementById('score-text');
        const restartBtn = document.getElementById('restart-btn');
        const quizTitle = document.getElementById('quiz-title');
        
        const questionText = document.getElementById('question-text');
        const choicesContainer = document.getElementById('choices-container');
        
        const matchingContainer = document.getElementById('matching-container');
        const termsColumn = document.getElementById('matching-terms');
        const definitionsColumn = document.getElementById('matching-definitions');

        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        let allQuizzes = {};
        let currentQuiz = {};
        let currentQuestionIndex = 0;
        let score = 0;
        let mistakes = [];
        let selectedTerm = null;

        async function loadQuizzes() {
            try {
                const response = await fetch(`data/questions.json?v=${new Date().getTime()}`);
                if (!response.ok) throw new Error(`HTTP error!`);
                allQuizzes = await response.json();
                displayQuizSelection();
            } catch (error) {
                console.error("Failed to load quizzes:", error);
                if(quizSelectionDiv) quizSelectionDiv.innerHTML = `<p>عذرًا، حدث خطأ فني أثناء تحميل بنك الأسئلة.</p>`;
            }
        }

        function displayQuizSelection() {
            quizSelectionDiv.innerHTML = '';
            quizArea.classList.add('hidden');
            resultArea.classList.add('hidden');
            quizSelectionDiv.classList.remove('hidden');
            quizTitle.textContent = "اختبارات المحاكاة";

            Object.keys(allQuizzes).forEach(quizKey => {
                const quiz = allQuizzes[quizKey];
                const card = document.createElement('div');
                card.className = 'quiz-selection-card';
                const title = document.createElement('h3');
                title.textContent = quiz.title;
                card.appendChild(title);
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary skill-btn';
                btn.textContent = `ابدأ اختبار ${quiz.title}`;
                btn.onclick = () => startQuiz(quizKey);
                card.appendChild(btn);
                quizSelectionDiv.appendChild(card);
            });
        }

        function startQuiz(quizKey) {
            currentQuiz = allQuizzes[quizKey];
            currentQuestionIndex = 0;
            score = 0;
            mistakes = [];
            quizSelectionDiv.classList.add('hidden');
            resultArea.classList.add('hidden');
            quizArea.classList.remove('hidden');
            nextBtn.textContent = 'السؤال التالي';
            nextBtn.classList.add('hidden');
            quizTitle.textContent = currentQuiz.title;

            if (currentQuiz.type === 'mcq') {
                matchingContainer.classList.add('hidden');
                choicesContainer.classList.remove('hidden');
                questionText.classList.remove('hidden');
                showMCQQuestion();
            } else if (currentQuiz.type === 'matching') {
                choicesContainer.classList.add('hidden');
                questionText.classList.remove('hidden');
                matchingContainer.classList.remove('hidden');
                setupMatchingQuiz();
            }
        }
        
        function showMCQQuestion() {
            while (choicesContainer.firstChild) choicesContainer.removeChild(choicesContainer.firstChild);
            nextBtn.classList.add('hidden');
            const question = currentQuiz.questions[currentQuestionIndex];
            questionText.textContent = question.question;

            question.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('choice-btn');
                button.onclick = () => selectMCQAnswer(button, choice, question.answer);
                choicesContainer.appendChild(button);
            });
            updateProgress();
        }

        function selectMCQAnswer(button, selectedChoice, correctAnswer) {
            choicesContainer.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
            if (selectedChoice === correctAnswer) {
                button.classList.add('correct');
                score++;
            } else {
                button.classList.add('incorrect');
                mistakes.push({ q: currentQuiz.questions[currentQuestionIndex].question, y: selectedChoice, c: correctAnswer });
            }
            if (currentQuestionIndex === currentQuiz.questions.length - 1) {
                nextBtn.textContent = "إنهاء الاختبار";
            }
            nextBtn.classList.remove('hidden');
        }
        
        function setupMatchingQuiz() {
            questionText.textContent = currentQuiz.instructions;
            termsColumn.innerHTML = '';
            definitionsColumn.innerHTML = '';
            updateProgress();
            const shuffledDefinitions = [...currentQuiz.definitions].sort(() => Math.random() - 0.5);

            currentQuiz.terms.forEach(term => {
                const termEl = document.createElement('div');
                termEl.textContent = term;
                termEl.className = 'match-item term-item';
                termEl.onclick = () => selectTerm(termEl);
                termsColumn.appendChild(termEl);
            });
            shuffledDefinitions.forEach(def => {
                const defEl = document.createElement('div');
                defEl.textContent = def.text;
                defEl.className = 'match-item def-item';
                defEl.dataset.match = def.match;
                defEl.onclick = () => selectDefinition(defEl);
                definitionsColumn.appendChild(defEl);
            });
        }

        function selectTerm(termEl) {
            if (termEl.classList.contains('matched')) return;
            document.querySelectorAll('.term-item').forEach(el => el.classList.remove('selected'));
            termEl.classList.add('selected');
            selectedTerm = termEl;
        }

        function selectDefinition(defEl) {
            if (defEl.classList.contains('matched') || !selectedTerm) return;
            if (defEl.dataset.match === selectedTerm.textContent) {
                score++;
                defEl.classList.add('matched', 'correct');
                selectedTerm.classList.add('matched', 'correct');
                selectedTerm = null;
                updateProgress();
                if (score === currentQuiz.terms.length) {
                    nextBtn.textContent = "إنهاء الاختبار";
                    nextBtn.classList.remove('hidden');
                }
            } else {
                defEl.classList.add('incorrect');
                setTimeout(() => defEl.classList.remove('incorrect'), 800);
            }
        }

        function handleNext() {
            if (currentQuiz.type === 'mcq') {
                currentQuestionIndex++;
                if (currentQuestionIndex < currentQuiz.questions.length) {
                    showMCQQuestion();
                } else {
                    showResults();
                }
            } else {
                showResults();
            }
        }
        
        function updateProgress() {
            const total = (currentQuiz.type === 'mcq') ? currentQuiz.questions.length : currentQuiz.terms.length;
            const current = (currentQuiz.type === 'mcq') ? currentQuestionIndex : score;
            progressBar.style.width = `${((current / total) * 100)}%`;
            progressText.textContent = `التقدم: ${current} / ${total}`;
        }

        function showResults() {
            quizArea.classList.add('hidden');
            resultArea.classList.remove('hidden');
            const total = (currentQuiz.type === 'mcq') ? currentQuiz.questions.length : currentQuiz.terms.length;
            scoreText.textContent = `نتيجتك: ${score} من ${total}`;
            const motivationText = resultArea.querySelector('#motivation-text');
            const percentage = (score / total) * 100;
            if (percentage === 100) motivationText.textContent = 'ممتاز! عمل رائع.';
            else if (percentage >= 70) motivationText.textContent = 'جيد جدًا! استمر في المراجعة.';
            else motivationText.textContent = 'تحتاج إلى المزيد من المذاكرة. ركز على أخطائك.';
            
            const mistakesReviewDiv = document.getElementById('mistakes-review');
            const mistakesList = document.getElementById('mistakes-list');
            mistakesList.innerHTML = '';
            if (mistakes.length === 0) {
                mistakesReviewDiv.classList.add('hidden');
            } else {
                mistakesReviewDiv.classList.remove('hidden');
                mistakes.forEach(m => {
                    const li = document.createElement('li');
                    li.innerHTML = `<p>${m.q}</p><span>إجابتك: ${m.y}</span><br><span>الصحيحة: ${m.c}</span>`;
                    mistakesList.appendChild(li);
                });
            }
        }
        
        nextBtn.addEventListener('click', handleNext);
        restartBtn.addEventListener('click', displayQuizSelection);
        
        loadQuizzes();
    }
});