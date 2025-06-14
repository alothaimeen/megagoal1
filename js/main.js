// This script will run after the entire HTML document is loaded and parsed.
document.addEventListener('DOMContentLoaded', function () {

    // --- TABS LOGIC for guide.html ---
    // Find the main container for our tabs section.
    const tabsContainer = document.querySelector('.tabs-container');

    // Only run this code if we are on a page with the .tabs-container element.
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        const tabContents = tabsContainer.querySelectorAll('.tab-content');

        // Add a click event listener to each tab button.
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // When a button is clicked, first remove the 'active' class from all buttons and content.
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Then, add the 'active' class to the button that was clicked.
                button.classList.add('active');
                
                // Find the content that corresponds to the clicked button using its 'data-unit' attribute.
                const targetContent = document.getElementById(button.dataset.unit);
                if (targetContent) {
                    // And add the 'active' class to show it.
                    targetContent.classList.add('active');
                }
            });
        });
    }


    // --- ACCORDION LOGIC for guide.html ---
    // Get all the accordion headers on the page.
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Add a click event listener to each accordion header.
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement; // The .accordion-item that contains the header.
            const wasActive = accordionItem.classList.contains('active'); // Check if it's already open.

            // This part handles closing other accordions in the same group.
            // It finds the direct parent container (.accordion) of the item.
            const parentAccordion = accordionItem.parentElement;
            if (parentAccordion) {
                // It then finds all items within that same group and removes the 'active' class.
                parentAccordion.querySelectorAll('.accordion-item').forEach(siblingItem => {
                    siblingItem.classList.remove('active');
                });
            }

            // If the clicked item was NOT active before, we add the 'active' class to open it.
            // If it WAS active, the step above already closed it.
            if (!wasActive) {
                accordionItem.classList.add('active');
            }
        });
    });


    // --- QUIZ LOGIC (Only runs on quiz.html) ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        // ... The quiz logic from the previous correct answer goes here ...
        // It is self-contained and does not need changes.
        const quizSelectionDiv = document.getElementById('quiz-selection');
        const quizArea = document.getElementById('quiz-area');
        const questionText = document.getElementById('question-text');
        const choicesContainer = document.getElementById('choices-container');
        const nextBtn = document.getElementById('next-btn');
        const resultArea = document.getElementById('result-area');
        const scoreText = document.getElementById('score-text');
        const restartBtn = document.getElementById('restart-btn');
        const quizTitle = document.getElementById('quiz-title');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const motivationText = document.getElementById('motivation-text');
        const mistakesList = document.getElementById('mistakes-list');
        
        let questions = {};
        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let mistakes = [];

        async function loadQuestions() {
            try {
                const response = await fetch(`data/questions.json?v=${new Date().getTime()}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                questions = await response.json();
                initializeQuizPage();
            } catch (error) {
                console.error("Failed to load questions.json:", error);
                if(quizSelectionDiv) quizSelectionDiv.innerHTML = `<p>عذرًا، حدث خطأ فني أثناء تحميل بنك الأسئلة.</p>`;
            }
        }

        function initializeQuizPage() {
            const params = new URLSearchParams(window.location.search);
            const unit = params.get('unit');
            const skill = params.get('skill');

            if (unit && skill && questions[unit] && questions[unit][skill]) {
                startQuiz(unit, skill);
            } else {
                displayQuizSelection();
            }
        }

        function displayQuizSelection() {
            if (!quizSelectionDiv) return;
            quizSelectionDiv.innerHTML = '';
            quizArea.classList.add('hidden');
            resultArea.classList.add('hidden');
            quizSelectionDiv.classList.remove('hidden');
            quizTitle.textContent = "الاختبارات التفاعلية";

            if (Object.keys(questions).length === 0) {
                quizSelectionDiv.innerHTML = '<p>جاري تحميل الاختبارات...</p>';
                return;
            }

            const units = {
                unit9: "Unit 9: Complaints",
                unit10: "Unit 10: I Wonder What Happened",
                unit11: "Unit 11: If It Hadn't Happened",
                unit12: "Unit 12: What They Said",
            };
            const skills = {
                grammar: "القواعد (Grammar)",
                reading: "القراءة (Reading)",
                writing: "الكتابة والمفردات (Writing & Vocab)"
            };

            Object.keys(units).forEach(unitKey => {
                const card = document.createElement('div');
                card.className = 'quiz-selection-card';
                const title = document.createElement('h3');
                title.textContent = units[unitKey];
                card.appendChild(title);

                Object.keys(skills).forEach(skillKey => {
                    if (questions[unitKey]?.[skillKey]?.length > 0) {
                        const btn = document.createElement('a');
                        btn.href = `quiz.html?unit=${unitKey}&skill=${skillKey}`;
                        btn.className = 'btn btn-primary skill-btn';
                        btn.textContent = skills[skillKey];
                        card.appendChild(btn);
                    }
                });
                quizSelectionDiv.appendChild(card);
            });
        }
        
        function startQuiz(unit, skill) {
            currentQuestions = questions[unit]?.[skill] || [];
            currentQuestionIndex = 0;
            score = 0;
            mistakes = [];
            quizSelectionDiv.classList.add('hidden');
            resultArea.classList.add('hidden');
            quizArea.classList.remove('hidden');
            const units = { unit9: "Unit 9", unit10: "Unit 10", unit11: "Unit 11", unit12: "Unit 12" };
            const skills = { grammar: "القواعد", reading: "القراءة", writing: "الكتابة" };
            quizTitle.textContent = `اختبار ${units[unit] || ''} - ${skills[skill] || ''}`;
            showQuestion();
        }
        
        function showQuestion() {
            while (choicesContainer.firstChild) choicesContainer.removeChild(choicesContainer.firstChild);
            nextBtn.classList.add('hidden');
            const question = currentQuestions[currentQuestionIndex];
            questionText.textContent = question.question;
            question.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('choice-btn');
                button.addEventListener('click', () => selectAnswer(button, choice, question.answer), { once: true });
                choicesContainer.appendChild(button);
            });
            updateProgress();
        }

        function selectAnswer(button, selectedChoice, correctAnswer) {
            document.querySelectorAll('.choice-btn').forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === correctAnswer) btn.classList.add('correct');
            });
            if (selectedChoice !== correctAnswer) {
                button.classList.add('incorrect');
                mistakes.push({
                    question: currentQuestions[currentQuestionIndex].question,
                    yourAnswer: selectedChoice,
                    correctAnswer: correctAnswer
                });
            } else {
                score++;
            }
            nextBtn.classList.remove('hidden');
        }
        
        function showResults() {
            quizArea.classList.add('hidden');
            resultArea.classList.remove('hidden');
            scoreText.textContent = `نتيجتك: ${score} من ${currentQuestions.length}`;
            const percentage = (score / currentQuestions.length) * 100;
            if (percentage === 100) motivationText.textContent = 'ممتاز! عمل رائع، لقد أتقنت هذه المهارة.';
            else if (percentage >= 70) motivationText.textContent = 'جيد جدًا! استمر في المراجعة للوصول للكمال.';
            else if (percentage >= 50) motivationText.textContent = 'لا بأس. تحتاج إلى مراجعة إضافية، ركز على أخطائك.';
            else motivationText.textContent = 'تحتاج إلى المزيد من المذاكرة. لا تستسلم، يمكنك فعلها!';
            const mistakesReviewDiv = document.getElementById('mistakes-review');
            mistakesList.innerHTML = '';
            if (mistakes.length === 0) {
                mistakesReviewDiv.classList.add('hidden');
            } else {
                mistakesReviewDiv.classList.remove('hidden');
                mistakes.forEach(m => {
                    const li = document.createElement('li');
                    li.innerHTML = `<p>${m.question}</p><span>إجابتك: ${m.yourAnswer}</span><br><span>الإجابة الصحيحة: ${m.correctAnswer}</span>`;
                    mistakesList.appendChild(li);
                });
            }
        }

        function updateProgress() {
            const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${currentQuestions.length}`;
        }

        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            (currentQuestionIndex < currentQuestions.length) ? showQuestion() : showResults();
        });

        restartBtn.addEventListener('click', displayQuizSelection);
        
        loadQuestions();
    }
});