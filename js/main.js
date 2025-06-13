document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'guide.html' || currentPage === '' || currentPage === 'index.html') {
        if(document.getElementById('guide-tabs')) initGuidePage();
    }
    
    if (currentPage === 'quiz.html') {
        initQuizPage();
    }
});

function initGuidePage() {
    const tabsContainer = document.getElementById('guide-tabs');
    const contentContainer = document.getElementById('guide-content');

    const guideData = {
        unit9: {
            title: "Unit 9: Complaints, Complaints",
            summary: "ملخص الوحدة التاسعة: تعلم كيف تشتكي وتتعامل مع المنتجات المعيبة.",
            grammar: {
                title: "Need to be / Have something done (ص. 140)",
                isImportant: true,
                audio: "audio/unit9_grammar.mp3",
                level1: "تُستخدم `need to be + done` للقول بأن شيئاً ما يحتاج إلى إصلاح. وتُستخدم `have something done` للقول بأنك ستجعل شخصًا آخر يقوم بالخدمة لك.",
                level2: "صيغة المبني للمجهول مع `need` تركز على 'الحاجة' للفعل. مثال: `The walls need to be repainted`.<br>صيغة السببية (Causative) مع `have/get` تركز على 'ترتيب' حدوث الفعل. مثال: `I will have the walls repainted`.",
                level3Title: "شرح الأساسيات",
                level3Content: `<div class="tree-diagram mt-2"><span>الموقف: "جدار الغرفة متسخ"</span><ul><li><span>هل سأقوم بطلائه بنفسي؟ لا.</span><ul><li><span>التركيز على أن "الجدار" هو المحتاج للطلاء:</span><ul><li>\`The wall needs to be painted.\`</li></ul></li><li><span>التركيز على "أنا" الذي سأرتب لعملية الطلاء:</span><ul><li>\`I will have the wall painted.\`</li></ul></li></ul></li></ul></div>`
            },
            reading: {
                title: "قانون مورفي (ص. 144)",
                text: "Murphy's Law states: If anything can <span class='tooltip' data-tooltip='يسوء'>go wrong</span>, it might go wrong! ... it's neither bad luck nor <span class='tooltip' data-tooltip='صدفة'>coincidence</span>. He explains that our <span class='tooltip' data-tooltip='انتقائية'>selective</span> memories tend to remember the bad episodes...",
                analysis: "<strong>ملخص النص:</strong> يناقش النص 'قانون مورفي' ويفسر لماذا نشعر بأن الأمور السيئة تحدث لنا بكثرة، موضحًا أن الأمر يعود لذاكرتنا الانتقائية وقوانين الاحتمالات."
            },
             writing: {
                title: "كتابة رسالة شكوى (ص. 146)",
                guide: `<h4>1. العصف الذهني:</h4><ul class="list-disc pr-6"><li>ما المنتج؟</li><li>ما المشكلة؟</li><li>ماذا تريد؟</li></ul><h4>2. الهيكل:</h4><ol class="list-decimal pr-6"><li>التحية: \`Dear Sir/Madam,\`</li><li>المقدمة: \`I am writing to complain about...\`</li><li>الخاتمة والطلب: \`I would like a full refund.\`</li></ol>`,
                example: `<p class="text-right"><strong>مثال:</strong><br>Dear Sir,<br>I am writing to complain about a faulty laptop I bought from your store on June 1st. The screen went blank after only two days. I would appreciate a full refund.</p><p class="mt-2 text-right"><strong>الترجمة:</strong><br>سيدي العزيز،<br>أكتب إليكم لأشتكي من حاسوب محمول معيب اشتريته من متجركم في الأول من يونيو. أصبحت الشاشة سوداء بعد يومين فقط. سأكون ممتنًا لو حصلت على استرداد كامل المبلغ.</p>`
            }
        },
        unit10: {
             title: "Unit 10: I Wonder What Happened",
             summary: "ملخص الوحدة العاشرة: تعلم كيف تخمن عن أحداث الماضي باستخدام الماضي التام وأفعال التخمين.",
             grammar: {
                title: "Past Perfect / Modals of Speculation (ص. 154)",
                isImportant: true,
                audio: "audio/unit10_grammar.mp3",
                level1: "نستخدم `had + pp` (الماضي التام) لوصف حدث وقع قبل حدث آخر في الماضي. ونستخدم `must/might/can't have + pp` للتخمين عن أحداث وقعت في الماضي.",
                level2: "<strong>Past Perfect:</strong> يرتب الأحداث. مثال: `When I arrived, the train had already left`.<br><strong>Modals of Speculation:</strong> `must have` (شبه يقين), `might have` (احتمال), `can't have` (شبه مستحيل).",
                level3Title: "شرح الأساسيات",
                level3Content: `<div class="tree-diagram mt-2"><span>الموقف: "نافذة الفصل مكسورة"</span><ul><li><span>هل أنا متأكد من السبب؟</span><ul><li><span>شبه متأكد: \`Someone must have thrown a ball.\`</span></li><li><span>محتمل: \`The wind might have broken it.\`</span></li><li><span>شبه مستحيل: \`It can't have broken by itself.\`</span></li></ul></li></ul></div>`
            },
        },
        unit11: { title: "Unit 11: If It Hadn't Happened", summary: "محتوى الوحدة 11 سيضاف هنا...", grammar: {} },
        unit12: { title: "Unit 12: What They Said", summary: "محتوى الوحدة 12 سيضاف هنا...", grammar: {} }
    };

    function renderUnit(unitKey) {
        const unit = guideData[unitKey];
        if (!unit) {
            contentContainer.innerHTML = `<p>المحتوى غير متوفر لهذه الوحدة.</p>`;
            return;
        };

        let grammarHtml = '';
        if (unit.grammar && unit.grammar.title) {
            grammarHtml = `
                <div class="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h3 class="text-2xl font-bold text-indigo-800 mb-4">${unit.grammar.isImportant ? '⭐' : ''} ${unit.grammar.title}</h3>
                    <div class="bg-indigo-50 p-3 rounded-lg mb-4">
                        <h4 class="font-bold">ملخص سريع للقاعدة:</h4>
                        <p>${unit.grammar.level1}</p>
                        <audio controls class="w-full mt-2" src="${unit.grammar.audio}"><p>متصفحك لا يدعم عنصر الصوت.</p></audio>
                    </div>
                    <div class="accordion">
                        <button class="accordion-toggle">
                            <span>للتفصيل أكثر...</span>
                            <span class="icon">▼</span>
                        </button>
                        <div class="accordion-content">
                            <div class="p-4">
                                <p class="text-lg"><strong>الشرح المفصل:</strong></p>
                                <p>${unit.grammar.level2}</p>
                                <div class="accordion mt-4">
                                     <button class="accordion-toggle">
                                        <span>${unit.grammar.level3Title}</span>
                                        <span class="icon">▼</span>
                                    </button>
                                    <div class="accordion-content">
                                        <div class="p-4">${unit.grammar.level3Content}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="quiz.html?unit=${unitKey}&skill=grammar" class="cta-button bg-indigo-600 text-white mt-4">اختبر نفسك الآن</a>
                </div>`;
        }
        
        // Similar checks for reading and writing
        let readingHtml = '';
        if (unit.reading && unit.reading.title) {
             readingHtml = `...` // Build reading HTML
        }

        let writingHtml = '';
        if (unit.writing && unit.writing.title) {
             writingHtml = `
             <div class="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 class="text-2xl font-bold text-sky-800 mb-4">${unit.writing.title}</h3>
                <div class="accordion">
                    <button class="accordion-toggle">
                        <span>عرض دليل الكتابة خطوة بخطوة...</span>
                        <span class="icon">▼</span>
                    </button>
                    <div class="accordion-content">
                        <div class="p-4 text-right">
                           ${unit.writing.guide}
                           <div class="mt-4 border-t pt-4">
                           ${unit.writing.example}
                           </div>
                        </div>
                    </div>
                </div>
             </div>
             `;
        }

        contentContainer.innerHTML = `
            <div class="unit-content-section slide-in">
                <h2 class="text-3xl font-bold text-indigo-700">${unit.title}</h2>
                <p class="text-lg text-gray-600 mb-6">${unit.summary}</p>
                ${grammarHtml}
                ${writingHtml}
            </div>
        `;
        setupAccordions();
    }

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.matches('.unit-tab')) {
            tabsContainer.querySelectorAll('.unit-tab').forEach(tab => tab.classList.remove('active'));
            e.target.classList.add('active');
            renderUnit(e.target.dataset.unit);
        }
    });

    renderUnit('unit9');
}


function setupAccordions() {
    document.querySelectorAll('.accordion-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                const parentAccordionContent = button.closest('.accordion-content');
                if(parentAccordionContent) {
                   parentAccordionContent.style.maxHeight = (parentAccordionContent.scrollHeight + content.scrollHeight) + 'px';
                }
            }
        });
    });
}

async function initQuizPage() {
    const quizWelcome = document.getElementById('quiz-welcome');
    const quizMain = document.getElementById('quiz-main');
    
    const urlParams = new URLSearchParams(window.location.search);
    const unit = urlParams.get('unit');
    const skill = urlParams.get('skill');

    if (unit && skill) {
        quizWelcome.classList.add('hidden');
        quizMain.classList.remove('hidden');
        startQuiz(unit, skill);
    } else {
         quizWelcome.classList.remove('hidden');
         quizMain.classList.add('hidden');
         document.getElementById('random-quiz-btn').addEventListener('click', () => {
            startQuiz('unit9', 'grammar');
         });
    }
}

async function startQuiz(unit, skill) {
    try {
        const response = await fetch('data/questions.json');
        const allQuestions = await response.json();
        
        const questions = allQuestions[unit]?.[skill] || [];
        if (questions.length === 0) {
            document.getElementById('quiz-container').innerHTML = `<h2 class="text-2xl font-bold text-red-600 text-center">عذراً، لم يتم العثور على أسئلة لهذا الاختبار.</h2><div class="text-center mt-4"><a href="guide.html" class="cta-button bg-indigo-600 text-white">العودة للشرح</a></div>`;
            return;
        }

        let currentQuestionIndex = 0;
        let score = 0;
        let userMistakes = [];

        const questionText = document.getElementById('question-text');
        const choicesContainer = document.getElementById('choices-container');
        const nextBtn = document.getElementById('next-question-btn');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        function displayQuestion() {
            const question = questions[currentQuestionIndex];
            questionText.innerHTML = question.question;
            choicesContainer.innerHTML = '';
            
            question.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.innerHTML = choice;
                button.classList.add('choice-button');
                button.dataset.index = index;
                button.addEventListener('click', selectAnswer);
                choicesContainer.appendChild(button);
            });

            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;

            nextBtn.classList.add('hidden');
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const selectedAnswer = selectedBtn.innerHTML;
            const question = questions[currentQuestionIndex];
            const correctAnswer = question.answer;

            choicesContainer.querySelectorAll('.choice-button').forEach(btn => {
                btn.removeEventListener('click', selectAnswer);
                btn.classList.add('disabled');
                if(btn.innerHTML === correctAnswer) {
                    btn.classList.add('correct');
                }
            });

            if (selectedAnswer === correctAnswer) {
                score++;
            } else {
                selectedBtn.classList.add('wrong');
                userMistakes.push({
                    question: question.question,
                    yourAnswer: selectedAnswer,
                    correctAnswer: correctAnswer,
                    explanation: question.explanation
                });
            }
            
            nextBtn.classList.remove('hidden');
        }
        
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if(currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showScore();
            }
        });

        function showScore() {
            document.getElementById('quiz-main').classList.add('hidden');
            const scoreContainer = document.getElementById('score-container');
            scoreContainer.classList.remove('hidden');

            const scoreTitle = document.getElementById('score-title');
            const scoreMessage = document.getElementById('score-message');
            const mistakesReview = document.getElementById('mistakes-review');
            const mistakesList = document.getElementById('mistakes-list');
            
            scoreTitle.textContent = `نتيجتك: ${score} من ${questions.length}`;
            if(score === questions.length) {
                scoreMessage.textContent = "ممتاز! إجاباتك كلها صحيحة، أنت مستعد تمامًا.";
            } else if (score >= questions.length / 2) {
                 scoreMessage.textContent = "جيد جداً! استمر في المراجعة وستصل للعلامة الكاملة.";
            } else {
                 scoreMessage.textContent = "لا بأس، كل خطأ هو فرصة للتعلم. راجع أخطاءك وحاول مرة أخرى.";
            }

            if(userMistakes.length > 0) {
                mistakesReview.classList.remove('hidden');
                mistakesList.innerHTML = userMistakes.map(m => `
                    <div class="p-4 bg-red-50 border-r-4 border-red-500 rounded">
                        <p class="font-semibold">${m.question.replace('(.........)', `<strong class="text-red-700">${m.yourAnswer}</strong>`)}</p>
                        <p class="mt-2 text-green-700 font-bold">✓ الإجابة الصحيحة: ${m.correctAnswer}</p>
                        <p class="mt-1 text-sm text-gray-600"><strong>التوضيح:</strong> ${m.explanation}</p>
                    </div>
                `).join('');
            }
        }

        displayQuestion();
    } catch(error) {
        console.error("Error loading quiz data:", error);
        document.getElementById('quiz-container').innerHTML = `<h2 class="text-2xl font-bold text-red-600 text-center">حدث خطأ أثناء تحميل الاختبار. تأكد من وجود ملف questions.json في مجلد data.</h2>`;
    }
}