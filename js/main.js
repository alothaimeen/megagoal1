document.addEventListener('DOMContentLoaded', () => {
    // Dynamically load Tailwind CSS for live preview environments
    if (!document.querySelector('link[href*="tailwindcss"]')) {
        const tw = document.createElement('script');
        tw.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(tw);
    }
    // Dynamically load Google Fonts
    if (!document.querySelector('link[href*="fonts.googleapis"]')) {
        const fontLink = document.createElement('link');
        fontLink.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
    }
    
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'guide.html' || currentPage === 'index.html' || currentPage === '') {
        if(document.getElementById('guide-tabs')) {
            initGuidePage();
        }
    }
    
    if (currentPage === 'quiz.html') {
        initQuizPage();
    }
});

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
            level3Title: "شرح الأساسيات (للمبتدئين)",
            level3Content: `<p>في اللغة الإنجليزية، الفاعل عادة يقوم بالفعل (I paint the wall). لكن أحيانًا، الفاعل يتلقى الفعل أو يتسبب فيه. هذا هو الفرق:</p><div class="tree-diagram mt-2"><span>الموقف: "جدار الغرفة متسخ"</span><ul><li><span>هل سأقوم بطلائه بنفسي؟ لا.</span><ul><li><span>إذا أردت التركيز على أن "الجدار" هو المحتاج للطلاء:</span><ul><li>نستخدم صيغة المجهول: \`The wall needs to be painted.\`</li></ul></li><li><span>إذا أردت التركيز على "أنا" الذي سأرتب لعملية الطلاء:</span><ul><li>نستخدم صيغة السببية: \`I will have the wall painted.\`</li></ul></li></ul></li></ul></div>`
        },
        vocabulary: {
            title: "مفردات هامة: Real Talk (ص. 143)",
            isImportant: false,
            audio: "audio/unit9_vocab.mp3",
            terms: [
                { term: "`It sounds like...`", definition: "تعني 'يبدو أن...' أو 'كأن الأمر...'. تستخدم لإعطاء انطباع عن شيء.", example: "It sounds like you had a great time. (يبدو أنك قضيت وقتاً رائعاً)"},
                { term: "`Yes, please, if you could.`", definition: "طريقة مهذبة جداً لقبول عرض المساعدة.", example: "A: 'Can I help you?' B: 'Yes, please, if you could.'"}
            ]
        },
        reading: {
            title: "قانون مورفي (ص. 144)",
            text: "Murphy's Law states: If anything can <span class='tooltip' data-tooltip='يسوء'>go wrong</span>, it might go wrong! ... it's neither bad luck nor <span class='tooltip' data-tooltip='صدفة'>coincidence</span>. He explains that our <span class='tooltip' data-tooltip='انتقائية'>selective</span> memories tend to remember the bad episodes more <span class='tooltip' data-tooltip='بسهولة'>readily</span> than the things that usually work out.",
            analysisTitle: "تحليل وملخص النص",
            analysisContent: "<strong>ملخص النص:</strong> يناقش النص 'قانون مورفي' ويفسر لماذا نشعر بأن الأمور السيئة تحدث لنا بكثرة، موضحًا أن الأمر يعود لذاكرتنا الانتقائية التي تركز على السلبيات، بالإضافة إلى قوانين الاحتمالات الرياضية التي تكون ضدنا أحياناً."
        },
        writing: {
            title: "كتابة رسالة شكوى (ص. 146)",
            guide: `<h4>1. العصف الذهني:</h4><ul class="list-disc pr-6"><li>ما المنتج؟ (مثال: a laptop)</li><li>ما المشكلة؟ (مثال: The screen is blank)</li><li>ماذا تريد؟ (مثال: a refund)</li></ul><h4>2. هيكل الرسالة:</h4><ol class="list-decimal pr-6"><li>التحية: \`Dear Sir/Madam,\`</li><li>المقدمة: \`I am writing to complain about...\`</li><li>شرح المشكلة بالتفصيل.</li><li>الطلب: \`I would therefore like a full refund.\`</li><li>الخاتمة: \`Yours sincerely,\`</li></ol>`,
            example: `<p class="text-right"><strong>مثال:</strong><br><em class="block text-left">Dear Sir,<br>I am writing to complain about a faulty laptop I bought from your store on June 1st. The screen went blank after only two days. I would appreciate a full refund.</em></p><p class="mt-2 text-right"><strong>الترجمة:</strong><br>سيدي العزيز،<br>أكتب إليكم لأشتكي من حاسوب محمول معيب اشتريته من متجركم في الأول من يونيو. أصبحت الشاشة سوداء بعد يومين فقط. سأكون ممتنًا لو حصلت على استرداد كامل المبلغ.</p>`
        }
    },
    unit10: {
        title: "Unit 10: I Wonder What Happened",
        summary: "ملخص الوحدة العاشرة: تعلم كيف تخمن عن أحداث الماضي باستخدام الماضي التام وأفعال التخمين.",
        grammar: {
            title: "Past Perfect & Modals of Speculation (ص. 154)",
            isImportant: true,
            audio: "audio/unit10_grammar.mp3",
            level1: "نستخدم `had + pp` (الماضي التام) لوصف حدث وقع قبل حدث آخر في الماضي. ونستخدم `must/might/can't have + pp` للتخمين عن أحداث وقعت في الماضي.",
            level2: "<strong>Past Perfect:</strong> يرتب الأحداث. مثال: `When I arrived, the train had already left`. (مغادرة القطار حدثت أولاً).<br><strong>Modals of Speculation:</strong> `must have` (للتعبير عن شبه اليقين), `might/could have` (للتعبير عن الاحتمال), `can't have` (للتعبير عن شبه الاستحالة).",
            level3Title: "شرح الأساسيات (للمبتدئين)",
            level3Content: `<p>عندما نرى نتيجة في الحاضر لشيء حدث في الماضي ولا نعرف سببه، نستخدم هذه الأفعال للتخمين.</p><div class="tree-diagram mt-2"><span>الموقف: "نافذة الفصل مكسورة الآن"</span><ul><li><span>ما هو تخميني عن السبب في الماضي؟</span><ul><li><span>تخمين قوي جداً (95%):</span><ul><li>\`Someone must have thrown a ball.\`</li></ul></li><li><span>تخمين محتمل (50%):</span><ul><li>\`The wind might have broken it.\`</li></ul></li><li><span>تخمين شبه مستحيل (5%):</span><ul><li>\`It can't have broken by itself.\`</li></ul></li></ul></li></ul></div>`
        },
        vocabulary: {
            title: "مفردات هامة: Real Talk (ص. 157)",
            isImportant: false,
            audio: "audio/unit10_vocab.mp3",
            terms: [
                { term: "`Beats me!`", definition: "تعبير عامي يعني 'لا أعرف على الإطلاق'.", example: "A: 'What time is the library open?' B: 'Beats me!'"},
                { term: "`You never know.`", definition: "تستخدم للقول بأن 'كل شيء ممكن' أو 'لا يمكن توقع ما سيحدث'.", example: "Maybe we will win the lottery. You never know."}
            ]
        },
        reading: {
            title: "رؤية المملكة 2030 (ص. 158)",
            text: "The Kingdom's most valuable <span class='tooltip' data-tooltip='مكسب/ثروة'>asset</span> is its Islamic, family-oriented society. The members of the Kingdom's society will enjoy a secure and happy life in a <span class='tooltip' data-tooltip='مستدام'>sustainable</span> environment. They will have social support, health care and high quality education.",
            analysisTitle: "تحليل وملخص النص",
            analysisContent: "<strong>ملخص النص:</strong> يؤكد النص على أن الثروة الحقيقية للمملكة هي مجتمعها، وأن رؤية 2030 تهدف إلى تمكين هذا المجتمع من خلال توفير حياة آمنة ومستدامة، ورعاية صحية وتعليم عالي الجودة، بالإضافة إلى تنمية الاقتصاد."
        },
        writing: {
            title: "وصف Kon-Tiki (ص. 161)",
            guide: `<h4>1. العصف الذهني:</h4><ul class="list-disc pr-6"><li>ما هو؟ (a raft)</li><li>من استخدمه؟ (Thor Heyerdahl)</li><li>لماذا؟ (to prove a theory)</li></ul><h4>2. هيكل الوصف:</h4><ol class="list-decimal pr-6"><li>جملة تعريفية: \`The Kon-Tiki was a famous raft...\`</li><li>جملة عن الشخص والهدف.</li><li>جملة عن الرحلة نفسها.</li></ol>`,
            example: `<p class="text-right"><strong>مثال:</strong><br><em class="block text-left">The Kon-Tiki was a simple raft used by Thor Heyerdahl in 1947. He sailed it across the Pacific Ocean to prove that ancient people could make long sea voyages.</em></p><p class="mt-2 text-right"><strong>الترجمة:</strong><br>كون-تيكي كانت طوافة بسيطة استخدمها ثور هيردال عام 1947. أبحر بها عبر المحيط الهادئ ليثبت أن الشعوب القديمة كان بإمكانها القيام برحلات بحرية طويلة.</p>`
        }
    },
    unit11: {
        title: "Unit 11: If It Hadn't Happened",
        summary: "ملخص الوحدة 11: تعلم كيف تعبر عن الندم وتتحدث عن مواقف افتراضية مستحيلة في الماضي.",
        grammar: {
            title: "Regrets & Hypothetical Past (ص. 168)",
            isImportant: true,
            audio: "audio/unit11_grammar.mp3",
            level1: "نستخدم `should have + pp` للتعبير عن الندم. ونستخدم `If + past perfect, ... would have + pp` للتحدث عن مواقف افتراضية في الماضي.",
            level2: "<strong>Regrets:</strong> `I should have studied harder.` (يعني: كان يجب أن أدرس، ولكني لم أفعل).<br><strong>Hypothetical Past (Third Conditional):</strong> يربط شرطًا مستحيلاً في الماضي بنتيجة مستحيلة. `If I had seen you, I would have said hello.` (لكني لم أرك، وبالتالي لم ألقِ التحية).",
            level3Title: "شرح الأساسيات (للمبتدئين)",
            level3Content: `<p>هذه الصيغ تستخدم للتحدث عن الماضي بشكل غير حقيقي، كأننا نقول "ماذا لو؟".</p><div class="tree-diagram mt-2"><span>الموقف الحقيقي: "لقد تأخرت عن الحافلة"</span><ul><li><span>التعبير عن الندم على تصرفي:</span><ul><li>\`I should have woken up earlier.\` (كان يجب أن أستيقظ مبكراً)</li></ul></li><li><span>تخيل نتيجة مختلفة لشرط مختلف:</span><ul><li>\`If I had woken up earlier, I would not have missed the bus.\` (لو استيقظت مبكراً، لما فاتتني الحافلة)</li></ul></li></ul></div>`
        },
         vocabulary: {
            title: "مفردات هامة: Real Talk (ص. 171)",
            isImportant: false,
            audio: "audio/unit11_vocab.mp3",
            terms: [
                { term: "`breathing down someone's neck`", definition: "تعني 'يراقبه باستمرار وبشكل مزعج'.", example: "My boss is always breathing down my neck about the deadline."}
            ]
        },
        reading: {
            title: "عمود النصائح لماريو (ص. 172)",
            text: "My best friend borrowed some money from me... He gave me a very funny look, threw a twenty-dollar bill at me, and walked away. I was really <span class='tooltip' data-tooltip='محبط/منزعج بشدة'>upset</span>... He said I had <span class='tooltip' data-tooltip='أحرجته'>embarrassed</span> him at the shop.",
            analysisTitle: "تحليل وملخص النص",
            analysisContent: "<strong>ملخص النص:</strong> القصة عن شخص أقرض صديقه مبلغاً من المال، وعندما طلب جزءاً منه لاحقاً، غضب الصديق وأنهى العلاقة، معتبراً أن طلب المال أمام الناس كان إحراجاً له. الكاتب يشعر بالضياع لأنه خسر صديقه بسبب مبلغ بسيط."
        },
        writing: {
            title: "كتابة رسالة نصيحة (ص. 175)",
            guide: `<h4>1. العصف الذهني:</h4><ul class="list-disc pr-6"><li>ما المشكلة؟ (سائق أعاد ساعة ثمينة وحصل على مكافأة قليلة ويشعر بالندم)</li><li>ما هي النصيحة؟ (الأمانة أفضل من المال)</li><li>كيف ستصيغها؟ (بلطف وتعاطف)</li></ul><h4>2. هيكل النصيحة:</h4><ol class="list-decimal pr-6"><li>إظهار التعاطف: \`Dear Honest But Wondering, I understand why you feel this way.\`</li><li>تقديم النصيحة الأساسية: \`However, I think you did the right thing.\`</li><li>شرح السبب.</li></ol>`,
            example: `<p class="text-right"><strong>مثال:</strong><br><em class="block text-left">Dear friend,<br>I understand your regret, but you absolutely did the right thing. Honesty is a priceless quality. You should be proud of your choice and not think about the money.</em></p><p class="mt-2 text-right"><strong>الترجمة:</strong><br>صديقي العزيز،<br>أتفهم ندمك، ولكنك فعلت الصواب تمامًا. الأمانة صفة لا تقدر بثمن. يجب أن تكون فخورًا باختيارك وألا تفكر في المال.</p>`
        }
    },
    unit12: {
        title: "Unit 12: What They Said",
        summary: "ملخص الوحدة 12: تعلم كيف تنقل كلام الآخرين بشكل صحيح باستخدام الكلام المنقول.",
        grammar: {
            title: "Reported Speech (ص. 182)",
            isImportant: true,
            audio: "audio/unit12_grammar.mp3",
            level1: "الكلام المنقول هو إعادة صياغة ما قاله شخص آخر. عند النقل، نغير زمن الفعل إلى درجة أقدم في الماضي (e.g., present -> past) ونغير الضمائر.",
            level2: "<strong>تغيير الأزمنة (Backshift):</strong> `Simple Present` -> `Simple Past` / `will` -> `would`.<br><strong>تغيير الضمائر:</strong> `I` -> `he/she`, `my` -> `his/her`.<br><strong>تغيير الظروف:</strong> `now` -> `then`, `today` -> `that day`.",
            level3Title: "شرح الأساسيات (للمبتدئين)",
            level3Content: `<p>تخيل أنك "مراسل" تنقل خبراً. لا يمكنك استخدام نفس كلمات الشخص بالضبط لأن الزمان والمكان تغيرا.</p><div class="tree-diagram mt-2"><span>الكلام المباشر: \`Adel: "I will travel tomorrow."\`</span><ul><li><span>بعد يوم، أنقل كلامه لشخص آخر:</span><ul><li>الضمير \`I\` يعود على عادل، فيصبح \`he\`.</li><li>الفعل \`will travel\` يرجع خطوة للماضي ليصبح \`would travel\`.</li><li>الظرف \`tomorrow\` يتغير ليناسب وقت النقل، فيصبح \`the next day\`.</li><li>النتيجة: \`Adel said that he would travel the next day.\`</li></ul></li></ul></div>`
        },
        vocabulary: {
            title: "مفردات هامة: Real Talk (ص. 185)",
            isImportant: true,
            audio: "audio/unit12_vocab.mp3",
            terms: [
                { term: "`hoax`", definition: "تعني 'خدعة' أو 'حيلة' مصممة لخداع شخص ما.", example: "The call about winning a free trip was a hoax."},
                { term: "`In the end`", definition: "تستخدم لتقديم النتيجة النهائية لحدث أو قصة.", example: "We argued a lot, but in the end, we agreed."}
            ]
        },
        reading: {
            title: "اقتباسات شهيرة (ص. 186)",
            text: "Helen Keller...: 'It is a terrible thing to see and have no <span class='tooltip' data-tooltip='بصيرة/رؤية'>vision</span>.'<br>Mark Twain (Writer): 'Never let formal education get in the way of your learning.'",
            analysisTitle: "تحليل وملخص النص",
            analysisContent: "<strong>ملخص النص:</strong> يقدم النص مجموعة من الاقتباسات الشهيرة لشخصيات تاريخية. كل اقتباس يحمل حكمة أو وجهة نظر مثيرة للتفكير.<br><strong>تحليل بعض الاقتباسات:</strong><br> - **هيلين كيلر:** تفرق بين البصر (الرؤية بالعين) والبصيرة (الفهم العميق)، وتعتبر أن فقدان البصيرة أسوأ من فقدان البصر. <br> - **مارك توين:** يشجع على التعلم المستمر من الحياة والتجارب، وعدم جعل التعليم الرسمي الجامد عائقًا أمام المعرفة الحقيقية."
        },
        writing: {
            title: "بريد إلكتروني مع تعليمات الوصول (ص. 189)",
            guide: `<h4>1. العصف الذهني:</h4><ul class="list-disc pr-6"><li>لمن تكتب؟ (uncle and aunt)</li><li>ما الخبر؟ (Mom is in the hospital)</li><li>ما هي التعليمات؟ (Take Main Ave, turn right...)</li></ul><h4>2. هيكل البريد الإلكتروني:</h4><ol class="list-decimal pr-6"><li>التحية: \`Hi Uncle,\`</li><li>المقدمة (الخبر): \`I hope you are well. I'm writing to tell you that...\`</li><li>التعليمات (استخدم أفعال الأمر): \`To get here, turn right...\`</li><li>الخاتمة: \`See you soon.\`</li></ol>`,
            example: `<p class="text-right"><strong>مثال:</strong><br><em class="block text-left">Hi Uncle Ahmed,<br>I hope this email finds you well. Unfortunately, mom is at Well Hospital. To get here, take Main Ave for two miles, then turn right onto Hinsdown Street. The hospital is on the left.</em></p><p class="mt-2 text-right"><strong>الترجمة:</strong><br>أهلاً عمي أحمد،<br>أتمنى أن تصلك هذه الرسالة وأنت بخير. للأسف، أمي في مستشفى ويل. للوصول إلى هنا، اسلك شارع ماين لمسافة ميلين، ثم انعطف يمينًا إلى شارع هينزداون. المستشفى على اليسار.</p>`
        }
    }
};

function initGuidePage() {
    const tabsContainer = document.getElementById('guide-tabs');
    const contentContainer = document.getElementById('guide-content');

    function renderUnit(unitKey) {
        const unit = guideData[unitKey];
        if (!unit) {
            contentContainer.innerHTML = `<p>المحتوى غير متوفر لهذه الوحدة.</p>`;
            return;
        }

        const createSection = (data, type, unitKey) => {
            if (!data || !data.title) return '';
            
            let contentHtml = '';
            switch(type) {
                case 'grammar':
                    contentHtml = `
                        <div class="bg-indigo-50 p-3 rounded-lg mb-4">
                            <h4 class="font-bold">ملخص سريع للقاعدة:</h4>
                            <p>${data.level1}</p>
                            <audio controls class="w-full mt-2" src="${data.audio}" preload="none"><p>متصفحك لا يدعم عنصر الصوت.</p></audio>
                        </div>
                        <div class="accordion">
                            <button class="accordion-toggle"><span>للتفصيل أكثر...</span><span class="icon">▼</span></button>
                            <div class="accordion-content">
                                <div class="p-4">
                                    <p class="text-lg"><strong>الشرح المفصل:</strong></p>
                                    <div class="prose max-w-none">${data.level2}</div>
                                    <div class="accordion mt-4">
                                        <button class="accordion-toggle"><span>${data.level3Title}</span><span class="icon">▼</span></button>
                                        <div class="accordion-content"><div class="p-4">${data.level3Content}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    break;
                case 'vocabulary':
                     contentHtml = `<div class="bg-green-50 p-3 rounded-lg mb-4">
                        <audio controls class="w-full mt-2" src="${data.audio}" preload="none"><p>متصفحك لا يدعم عنصر الصوت.</p></audio>
                        <ul class="list-disc pr-6 mt-2 space-y-2">${data.terms.map(t => `<li><strong>${t.term}</strong> ${t.definition}<br><em class="text-gray-600">مثال: ${t.example}</em></li>`).join('')}</ul>
                     </div>`;
                    break;
                case 'reading':
                    contentHtml = `
                        <p class="mb-4 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">${data.text}</p>
                        <div class="accordion">
                            <button class="accordion-toggle"><span>${data.analysisTitle}</span><span class="icon">▼</span></button>
                            <div class="accordion-content"><div class="p-4 text-right">${data.analysisContent}</div></div>
                        </div>`;
                    break;
                case 'writing':
                    contentHtml = `
                         <div class="accordion">
                            <button class="accordion-toggle"><span>عرض دليل الكتابة خطوة بخطوة...</span><span class="icon">▼</span></button>
                            <div class="accordion-content">
                                <div class="p-4 text-right">
                                   ${data.guide}
                                   <div class="mt-4 border-t pt-4">${data.example}</div>
                                </div>
                            </div>
                        </div>`;
                    break;
            }

            const colors = { grammar: 'indigo', vocabulary: 'green', reading: 'orange', writing: 'sky' };
            const color = colors[type];
            const quizLink = type !== 'writing' ? `<a href="quiz.html?unit=${unitKey}&skill=${type}" class="cta-button bg-${color}-600 text-white mt-4">اختبر نفسك الآن</a>` : '';

            return `
                <div class="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h3 class="text-2xl font-bold text-${color}-800 mb-4">${data.isImportant ? '⭐' : ''} ${data.title}</h3>
                    ${contentHtml}
                    ${quizLink}
                </div>`;
        };

        contentContainer.innerHTML = `
            <div class="unit-content-section slide-in">
                <h2 class="text-3xl font-bold text-gray-800">${unit.title}</h2>
                <p class="text-lg text-gray-600 mb-6">${unit.summary}</p>
                ${createSection(unit.grammar, 'grammar', unitKey)}
                ${createSection(unit.vocabulary, 'vocabulary', unitKey)}
                ${createSection(unit.reading, 'reading', unitKey)}
                ${createSection(unit.writing, 'writing', unitKey)}
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
                if(parentAccordionContent && parentAccordionContent.style.maxHeight) {
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
    let unit = urlParams.get('unit');
    let skill = urlParams.get('skill');

    if (unit && skill) {
        quizWelcome.classList.add('hidden');
        quizMain.classList.remove('hidden');
        await startQuiz(unit, skill);
    } else {
         quizWelcome.classList.remove('hidden');
         quizMain.classList.add('hidden');
         document.getElementById('random-quiz-btn').addEventListener('click', async () => {
            const response = await fetch('data/questions.json');
            const allQuestions = await response.json();
            const units = Object.keys(allQuestions);
            const randomUnit = units[Math.floor(Math.random() * units.length)];
            const skills = Object.keys(allQuestions[randomUnit]);
            const randomSkill = skills[Math.floor(Math.random() * skills.length)];
            window.location.href = `quiz.html?unit=${randomUnit}&skill=${randomSkill}`;
         });
    }
}

async function startQuiz(unit, skill) {
    try {
        const response = await fetch('data/questions.json');
        if (!response.ok) throw new Error('Network response was not ok');
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
            
            question.choices.forEach((choice) => {
                const button = document.createElement('button');
                button.innerHTML = choice;
                button.classList.add('choice-button');
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
                        <p class="font-semibold">${m.question.replace(/\(\.{3,}\)/, `<strong class="text-red-700">${m.yourAnswer}</strong>`)}</p>
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