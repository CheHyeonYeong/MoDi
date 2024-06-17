
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultElement = document.getElementById('mbti-result');
const descriptionElement = document.getElementById('mbti-description');
const progressBar = document.getElementById('progress-bar');


// 현재 질문 인덱스
let currentQuestion = 0;

// 성향별 점수를 저장하는 객체
let mbtiScore = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
};

// 질문과 선택지
const questions = [
    {
        imgSrc : "questions/1.png",
        text: "내일은 기다리던 소풍 날! 당신은 어떤 모습인가요?",
        choices: [
            { text: "소풍 가서 뭐 하고 놀지 벌써부터 상상의 나래를 펼치느라 잠이 오지 않는다", type: "P" },
            { text: "내일 소풍을 위해 일찍 잠자리에 들어 컨디션을 조절한다", type: "J" }
        ]
    },
    {
        imgSrc : "questions/2.jpg",
        text: "소풍 장소에 도착한 도토리 친구들, 당신은 무엇을 하고 싶나요?",
        choices: [
            { text: "친구들과 함께 숲속 탐험", type: "E" },
            { text: "아름다운 자연 속에서 혼자 하는 독서", type: "I" }
        ]
    },
    {
        imgSrc : "questions/3.jpg",
        text: "소풍 장소에서 발견한 미지의 숲, 당신은 어떻게 할까요?",
        choices: [
            { text: "호기심이 생겨 숲을 탐험해 본다", type: "N" },
            { text: "위험하니 돌아간다", type: "S" }
        ]
    },
    {
        imgSrc : "questions/4.jpg",
        text: "도토리 친구 한 명이 슬퍼 보여요. 어떻게 위로해 줄까요?",
        choices: [
            { text: "곁에 있어주며 말없이 손을 잡아준다", type: "F" },
            { text: "재미있는 이야기로 친구를 웃게 만든다", type: "T" }
        ]
    },
    {
        imgSrc : "questions/5.jpg",
        text: "도토리 마을에 새로운 친구가 왔어요. 당신은 어떤 모습인가요?",
        choices: [
            { text: "먼저 다가가 인사한다", type: "E" },
            { text: "새로운 친구를 관찰하며 천천히 다가간다", type: "I" }
        ]
    },
    {
        imgSrc : "questions/6.jpg",
        text: "도토리 친구가 중요한 결정을 해야 해요. 당신은 어떻게 도와줄까요?",
        choices: [
            { text: "친구의 감정에 공감하며 조언한다", type: "F" },
            { text: "상황을 논리적으로 분석해 조언한다", type: "T" }
        ]
    },
    {
        imgSrc : "questions/7.jpg",
        text: "도토리 올림픽 날! 어떤 종목에 출전하고 싶나요?",
        choices: [
            { text: "빠른 속도를 자랑할 수 있는 달리기", type: "S" },
            { text: "창의적인 전략으로 승부하는 보물찾기", type: "N" }
        ]
    },
    {
        imgSrc : "questions/8.jpg",
        text: "도토리 마을에 축제가 열렸어요. 당신은 축제를 어떻게 즐기고 싶나요?",
        choices: [
            { text: "친구들과 함께 이곳저곳 돌아다니며 구경", type: "P" },
            { text: "미리 세운 계획에 따라 체계적으로 즐기기", type: "J" }
        ]
    },
    {imgSrc : "questions/9.jpg",
        text: "도토리 마을 축제의 전통! 요리 대회 날이에요. 당신은 어떤 방식으로 요리를 준비할까요?",
        choices: [
            { text: "대회 전날까지 다양한 레시피를 실험해보고 즉흥적으로 요리한다", type: "P" },
            { text: "대회 전에 미리 레시피를 정해 연습하고 계획에 따라 요리한다", type: "J" }
        ]
    },
    {
        imgSrc : "questions/10.jpg",
        text: "축제에서 재미있어 보이는 댄스 공연이 있어요. 당신의 행동은?",
        choices: [
            { text: "주저 없이 앞에 나가서 신나게 춤을 춘다", type: "E" },
            { text: "뒤에서 조용히 구경하는 것이 좋겠다", type: "I" }
        ]
    },
    {
        imgSrc : "questions/11.jpg",
        text: "도토리 마을에 위기가 찾아왔어요. 당신은 어떤 역할을 하고 싶나요?",
        choices: [
            { text: "상황을 분석하고 논리적인 해결책을 제시한다", type: "T" },
            { text: "친구들의 마음을 헤아리며 위로와 공감을 전한다", type: "F" }
        ]
    },
    {imgSrc : "questions/12.jpg",
        text: "위기가 해결되고 마을에 평화가 찾아왔어요. 당신이 가장 기뻐하는 이유는?",
        choices: [
            { text: "앞으로 마을에 좋은 일들이 가득할 것 같아서", type: "N" },
            { text: "일상의 평화로움이 돌아와서", type: "S" }
        ]
    }
];

// 전체 질문 수
const totalQuestions = questions.length;

function startTest() {
    startScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    currentQuestion = 0;
    mbtiScore = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };
    showQuestion();
}

function showQuestion() {
    const qimg = document.getElementById('question-img');
    questionElement.innerText = questions[currentQuestion].text;
    choicesElement.innerHTML = '';
    progressBar.style.display = 'block';

    questions[currentQuestion].choices.forEach(choice => {
        qimg.src = questions[currentQuestion].imgSrc; // 이 부분을 수정
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => {
            selectChoice(choice.type);
        };
        choicesElement.appendChild(button);
    });
    updateProgressBar();
}


function selectChoice(type) {
    const qimg = document.getElementById('question-img');
    mbtiScore[type]++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        progressBar.style.display = 'none';
        showQuestion();
    } else {
        progressBar.style.display = 'none';
        showResult();
    }

}

function showResult() {
    questionScreen.style.display = 'none';
    progressBar.style.display = 'none';
    resultScreen.style.display = 'block';

    // MBTI 결과 계산을 위해 백엔드로 데이터 전송
    let mbtiData = JSON.stringify({
        e: mbtiScore.E,
        i: mbtiScore.I,
        s: mbtiScore.S,
        n: mbtiScore.N,
        t: mbtiScore.T,
        f: mbtiScore.F,
        p: mbtiScore.P,
        j: mbtiScore.J
    });

    fetch('/mbti/result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: mbtiData
    })
        .then(response => response.json())
        .then(data => {
            const mbtiResult = data.result;
            const percentage = data.percentage;
            displayMbtiResult(mbtiResult, percentage);
            setKakaoLink(mbtiResult);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('결과를 계산하는 도중 오류가 발생했습니다.');
        });
}

function displayMbtiResult(mbtiType, percentage) {
    const mbtiTitle = document.getElementById('mbti-title');
    const mbtiDescription = document.getElementById('mbti-description');
    const mbtiInfo = document.getElementById('mbti-info')
    const mbtiImage = document.getElementById('mbti-image');
    const mbtiPercentage = document.getElementById('mbti-percentage');
    const goodCompatibilityImage = document.getElementById('good-compatibility-image');
    const badCompatibilityImage = document.getElementById('bad-compatibility-image');
    const goodCompatibility = document.querySelector('.good-compatibility p');
    const badCompatibility = document.querySelector('.bad-compatibility p');

    mbtiTitle.innerText = getMbtiTitle(mbtiType);
    mbtiInfo.innerText = getMbtiInfo(mbtiType);
    mbtiDescription.innerHTML = getMbtiDescriptionList(mbtiType);
    mbtiImage.src = getMbtiImagePath(mbtiType);

    mbtiPercentage.innerText = `${percentage.toFixed(2)}%`;

    goodCompatibilityImage.src = getGoodCompatibilityImagePath(mbtiType);
    badCompatibilityImage.src = getBadCompatibilityImagePath(mbtiType);

    const goodCompatibilityType = getGoodCompatibility(mbtiType);
    const badCompatibilityType = getBadCompatibility(mbtiType);

    goodCompatibility.innerText = goodCompatibilityType !== '' ? `${getMbtiTitle(goodCompatibilityType)}` : '';
    badCompatibility.innerText = badCompatibilityType !== '' ? `${getMbtiTitle(badCompatibilityType)}` : '';
}

function getMbtiImagePath(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'Images/INTJ.png';
        case 'INTP':
            return 'Images/INTP.png';
        case 'ENTJ':
            return 'Images/ENTJ.png';
        case 'ENTP':
            return 'Images/ENTP.png';
        case 'INFJ':
            return 'Images/INFJ.png';
        case 'INFP':
            return 'Images/INFP.png';
        case 'ENFJ':
            return 'Images/ENFJ.png';
        case 'ENFP':
            return 'Images/ENFP.png';
        case 'ISTJ':
            return 'Images/ISTJ.png';
        case 'ISFJ':
            return 'Images/ISFJ.png';
        case 'ESTJ':
            return 'Images/ESTJ.png';
        case 'ESFJ':
            return 'Images/ESFJ.png';
        case 'ISTP':
            return 'Images/ISTP.png';
        case 'ISFP':
            return 'Images/ISFP.png';
        case 'ESTP':
            return 'Images/ESTP.png';
        case 'ESFP':
            return 'Images/ESFP.png';
    }
}

function getMbtiTitle(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return "통찰력 있는\n전략가 도토리";
        case 'INTP':
            return "호기심 많은\n사색가 도토리";
        case 'ENTJ':
            return "멋진 카리스마의\n리더 도토리";
        case 'ENTP':
            return "재치 있는\n아이디어뱅크 도토리";
        case 'INFJ':
            return "따뜻한 마음의\n치유사 도토리";
        case 'INFP':
            return "순수한 마음의\n이상주의자 도토리";
        case 'ENFJ':
            return "배려심 깊은\n잔다르크 도토리";
        case 'ENFP':
            return "자유로운 영혼의\n열정 도토리";
        case 'ISTJ':
            return "책임감 강한\n원칙주의자 도토리";
        case 'ISFJ':
            return "세심한 보살핌의\n엄마 도토리";
        case 'ESTJ':
            return "철두철미한\n계획러 도토리";
        case 'ESFJ':
            return "친화력 갑\n분위기메이커 도토리";
        case 'ISTP':
            return "뛰어난 솜씨의\n장인 도토리";
        case 'ISFP':
            return "감성 가득한\n예술가 도토리";
        case 'ESTP':
            return "탄탄한 체력의\n운동선수 도토리";
        case 'ESFP':
            return "흥 넘치는\n댄스머신 도토리";
    }
}

function getMbtiInfo(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return "내가 만든 계획은 한 치의 오차도 없지!";
        case 'INTP':
            return "세상 모든 것들이 궁금해!";
        case 'ENTJ':
            return "모두 나를 따르라!";
        case 'ENTP':
            return "어떤 문제든 내게 맡겨봐!";
        case 'INFJ':
            return "내 곁에 있으면 마음이 편안해질 거야";
        case 'INFP':
            return "세상은 아직 아름다운 곳이야!";
        case 'ENFJ':
            return "내가 있는 한 아무도 외롭지 않을 거야!";
        case 'ENFP':
            return "인생은 재미있게 살아야지!";
        case 'ISTJ':
            return "원칙이 곧 나의 삶의 지표!";
        case 'ISFJ':
            return "우리 도토리들은 내가 다 챙길게!";
        case 'ESTJ':
            return "계획 세우기는 나에게 맡겨!";
        case 'ESFJ':
            return "내가 있는 곳이 바로 파티 플레이스!";
        case 'ISTP':
            return "이건 어때? 내 작품이야!";
        case 'ISFP':
            return "아름다움이 가득한 세상 속에서 살고 있어";
        case 'ESTP':
            return "오늘 한 게임 할래?";
        case 'ESFP':
            return "춤추는 거 말고는 관심 없어!";
    }
}

function getMbtiDescriptionList(mbtiType) {
    const descriptionList = getMbtiDescription(mbtiType).split('\n');
    let listHtml = '';

    for (let i = 1; i < descriptionList.length; i++) {
        listHtml += `<li>${descriptionList[i]}</li>`;
    }

    return listHtml;
}

function getMbtiDescription(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return "\n머릿속에는 언제나 멋진 비전이 가득해요. 큰 그림을 그리는 것은 저의 특기랍니다!\n새로운 아이디어를 찾아내는 것을 좋아해요. 늘 더 나은 방법이 없는지 고민하죠.\n문제 해결을 위해 빠르고 효율적인 전략을 세우는 건 식은 죽 먹기예요!\n감정에 휘둘리지 않아요. 이성적이고 논리적으로 사고하는 것이 저의 강점이에요.\n독창적인 인사이트로 모두를 놀라게 만드는 것이 재미있어요. 남들과 다른 시각을 가지고 있죠.\n미래를 내다보는 혜안이 있어요. 먼 미래를 위한 준비를 게을리하지 않아요.\n지적 호기심이 가득해요. 배우고 성장하는 것을 멈추고 싶지 않아요.\n완벽을 추구해요. 계획한 것은 반드시 실행에 옮기고 최고의 결과물을 만들어내죠.";
        case 'INTP':
            return "\n끊임없이 새로운 지식을 탐구하는 것이 즐거워요. 세상에는 배울 게 너무나도 많아요!\n논리적인 분석과 추론을 좋아해요. 복잡한 문제를 해결하는 것은 저의 특기랍니다.\n독창적인 아이디어를 내는 것이 재미있어요. 저만의 신선한 관점으로 세상을 바라보죠.\n자유로운 사고를 추구해요. 정해진 틀에 갇히는 건 저와 맞지 않아요.\n궁금한 게 생기면 끝까지 파고드는 집요함이 있어요. 호기심이 샘솟거든요!\n혼자만의 시간을 즐겨요. 그래야 마음껏 사색에 빠질 수 있어요.\n감정보다는 이성을 믿어요. 객관적이고 중립적인 자세를 유지하려고 노력해요.\n사회적 규범이나 권위에 얽매이지 않아요. 저만의 가치관을 따르죠.";
        case 'ENTJ':
            return "\n타고난 리더예요. 어떤 상황에서도 리더십을 발휘하죠.\n목표를 달성하기 위해 전략적으로 계획을 세워요. 철저한 실행력도 갖추고 있죠.\n어려운 도전도 마다하지 않아요. 오히려 그런 상황을 즐기는 편이랍니다.\n자신감이 넘쳐요. 내 능력을 의심하지 않고 힘차게 나아가요.\n효율성을 중시해요. 최소한의 노력으로 최대의 성과를 내는 것이 목표예요.\n미래 비전을 제시하는 능력이 뛰어나요. 멋진 청사진을 그리는 것은 저의 특기!\n논리적이고 객관적인 사고를 신뢰해요. 감정에 휘둘리지 않아요.\n성취욕구가 강해요. 더 높은 목표를 향해 달려가는 것을 멈추지 않아요.";
        case 'ENTP':
            return "\n기발한 아이디어로 모두를 놀라게 해요. 상상력이 저의 무기랍니다!\n새로운 가능성을 발견하는 것을 좋아해요. 늘 다양한 관점에서 사물을 바라보죠.\n토론을 즐겨요. 서로 다른 생각을 나누며 통찰을 얻는 것이 재미있어요.\n통찰력이 뛰어나요. 복잡한 문제의 핵심을 꿰뚫어 보는 능력이 있어요.\n변화를 두려워하지 않아요. 오히려 변화를 즐기고 새로운 도전을 찾아 나서죠.\n독립적인 사고를 추구해요. 남들과 다른 길을 가는 것이 저의 매력이에요.\n호기심이 왕성해요. 이것저것 탐구하고 실험하는 것을 좋아해요.\n재치 있는 입담으로 주변을 즐겁게 해요. 위트 있는 대화가 저의 특기랍니다!";
        case 'INFJ':
            return "\n공감 능력이 뛰어나요. 다른 도토리들의 감정을 잘 읽고 이해해요.\n통찰력이 놀라워요. 직관적으로 상황의 본질을 꿰뚫어 보죠.\n이상주의자예요. 더 나은 세상을 만들기 위해 노력해요.\n타인을 돕는 것에서 보람을 느껴요. 따뜻한 마음으로 상대방을 보듬어주죠.\n깊이 있는 대화를 즐겨요. 마음을 터놓고 소통하는 것이 행복해요.\n창의력이 풍부해요. 독특하고 영감 어린 아이디어를 내는 것이 특기랍니다.\n문제 해결에 능해요. 복잡한 상황을 잘 정리하고 해결책을 찾아내죠.\n완벽주의 성향이 있어요. 스스로에게 엄격한 기준을 세우고 따르죠."
        case 'INFP':
            return "\n이상과 가치관을 중시해요. 내 신념을 지키며 살아가죠.\n창의력이 넘쳐요. 상상의 나래를 펼치며 새로운 것을 만들어내는 게 즐거워요.\n깊은 감수성을 가지고 있어요. 작은 것에도 큰 의미를 부여하죠.\n타인의 감정에 공감하는 능력이 있어요. 남의 아픔을 내 아픔처럼 느껴요.\n자기 성찰을 즐겨요. 내면의 목소리에 귀 기울이며 성장해 나가요.\n자유로운 영혼이에요. 구속받는 것을 싫어하고 마음 가는 대로 살아요.\n평화로운 세상을 꿈꿔요. 다툼 없는 조화로운 세상을 바라죠.\n순수하고 열정적이에요. 좋아하는 일에 몰두할 때 진정한 행복을 느껴요."
        case 'ENFJ':
            return "\n카리스마 넘치는 리더예요. 타고난 리더십으로 도토리 친구들을 이끌어요.\n공감 능력이 뛰어나요. 상대방의 마음을 잘 헤아리고 배려하죠.\n사회성이 좋아요. 어디서든 잘 어울리고 좋은 관계를 유지해요.\n따뜻한 격려와 지지를 보내요. 타인의 성장을 진심으로 응원하죠.\n문제 해결에 능해요. 창의적이고 효과적인 해결책을 찾아내는 재주가 있어요.\n미래를 내다보는 혜안이 있어요. 통찰력 있는 비전을 제시하죠.\n책임감이 강해요. 맡은 바 임무를 헌신적으로 수행해요.\n긍정의 에너지를 발산해요. 낙천적인 마인드로 주변에 활력을 주죠."
        case 'ENFP':
            return "\n열정과 에너지가 넘쳐요! 하고 싶은 일이라면 무엇이든 도전해요.\n사람들과 어울리는 것을 좋아해요. 파티의 주인공은 바로 저!\n독창적인 아이디어가 샘솟아요. 기발한 발상으로 새로운 것을 만들어내죠.\n자유로운 삶을 동경해요. 틀에 박힌 삶은 저와 맞지 않아요.\n열린 마음으로 세상을 바라봐요. 다양성을 인정하고 포용하죠.\n감정이입을 잘해요. 상대방의 입장에서 생각하고 공감하는 능력이 있어요.\n순간을 즐길 줄 알아요. 지금 이 순간에 몰입하며 행복을 느끼죠.\n긍정의 마법사예요. 낙관적인 마인드로 힘든 순간도 이겨내요."
        case 'ISTJ':
            return "\n성실함은 저의 이름! 맡은 바 임무는 끝까지 완수해요.\n원칙을 중시해요. 정직하고 공정한 행동을 하려고 노력하죠.\n계획적으로 일해요. 체계적으로 업무를 처리하는 데에 능숙하답니다.  \n신중하게 의사결정을 해요. 충분한 정보를 모은 뒤 결정을 내리죠.\n전통을 소중히 여겨요. 변화보다는 안정을 추구하는 편이에요.\n조용하고 내성적이에요. 말보다는 행동으로 보여주는 스타일이죠.\n객관성을 유지해요. 사실에 기반해 논리적으로 사고하려고 노력해요.\n참을성이 강해요. 장기적인 목표를 위해 꾸준히 노력하죠."
        case 'ISFJ':
            return "\n배려심이 넘쳐요. 다른 도토리들을 세심하게 보살피죠.\n예의 바르고 겸손해요. 공손한 태도로 상대방을 대해요.\n섬세한 관찰력이 있어요. 작은 변화도 놓치지 않고 캐치하죠.\n인내심이 강해요. 어려운 상황에서도 묵묵히 견디며 나아가요.\n조화를 중시해요. 다른 도토리들과 평화롭게 지내는 것이 좋아요.\n책임감이 강해요. 자신의 역할을 성실히 수행하죠.\n동정심이 많아요. 어려움에 처한 도토리들을 외면하지 못해요.\n안정을 추구해요. 편안하고 평화로운 일상을 즐기죠."
        case 'ESTJ':
            return "\n목표 달성을 위해 체계적으로 계획을 세워요. 계획한 것은 반드시 실행에 옮기죠.\n현실적이고 실용적이에요. 이상보다는 현실에 기반해 생각해요.\n리더십이 뛰어나요. 모두를 이끌며 조직을 잘 운영하죠.\n규칙을 중시해요. 질서를 세우고 그에 따르는 것이 중요하다고 생각해요.\n단호하게 의사결정을 내려요. 우유부단한 것을 싫어해요.\n책임감이 강해요. 맡은 바 역할을 훌륭히 해내죠.\n논리적으로 사고해요. 감정보다는 이성에 따라 행동하려고 노력해요.\n높은 업무 능력을 자랑해요. 어떤 일이든 효율적으로 처리해요."
        case 'ESFJ':
            return "\n사교적이고 외향적이에요. 새로운 도토리들과 어울리는 것을 좋아해요.\n배려심이 넘쳐요. 다른 도토리들의 감정을 잘 읽고 공감해주죠.\n협력을 중시해요. 다른 도토리들과 힘을 합쳐 일하는 것을 좋아해요.\n긍정의 에너지를 발산해요. 밝은 에너지로 주변 분위기를 띄워요. \n조화를 이뤄내는 재주가 있어요. 도토리들 사이에서 중재자 역할을 잘 해요.\n전통을 소중히 여겨요. 안정적이고 변화가 적은 환경을 선호해요.\n책임감이 강해요. 도토리 사회에서 자신의 역할을 다하는 것이 중요하다고 생각해요.\n친절하고 상냥해요. 따뜻한 미소로 상대방을 대해요."
        case 'ISTP':
            return "\n관찰력이 뛰어나요. 작은 디테일도 놓치지 않고 캐치하죠.\n실용적이고 현실적이에요. 이론보다는 실제로 써먹을 수 있는 것을 중시해요.\n문제 해결 능력이 탁월해요. 난관에 부딪혔을 때 침착하게 해결책을 찾아내죠.\n손재주가 좋아요. 기계를 다루는 데에 특히 소질이 있어요.\n모험을 즐겨요. 스릴 넘치는 활동에서 짜릿함을 느껴요.\n개인의 자유를 중시해요. 간섭받는 것을 싫어하고 마음대로 행동하고 싶어 해요.\n객관적으로 상황을 분석해요. 논리적이고 이성적으로 판단하죠.\n순발력이 좋아요. 예기치 못한 상황에서도 재빨리 대처해요."
        case 'ISFP':
            return "\n따뜻한 감성을 가지고 있어요. 아름다움에 깊이 감동하죠.\n삶을 있는 그대로 받아들여요. 현재에 충실하게 살아가요.\n예술적 감각이 뛰어나요. 창의적인 작품 활동을 즐기죠.\n조용하고 내성적이에요. 혼자만의 시간을 즐기는 편이에요.\n타인을 존중해요. 다른 도토리들의 생각과 가치관을 인정해주죠.\n자유로운 영혼이에요. 구속받는 것을 싫어하고 자유를 갈망해요.\n공감 능력이 뛰어나요. 상대방의 감정을 잘 읽고 위로해주죠.\n겸손하고 섬세해요. 자신을 내세우기보다는 조용히 자신의 길을 가요."
        case 'ESTP':
            return "\n활동적이고 외향적이에요. 운동神이라는 별명이 있을 정도로 체력이 좋아요!\n순발력이 뛰어나요. 빠른 판단력으로 술술 문제를 해결하죠.\n모험을 즐겨요. 새로운 스릴을 찾아 도전하는 것을 좋아해요.\n실용적이고 현실적이에요. 복잡한 이론보다는 실용성을 중시해요.\n사교성이 좋아요. 어디서나 도토리들과 쉽게 어울리죠.\n관찰력이 뛰어나요. 상황 판단을 정확하게 내리는 편이에요.\n임기응변에 능해요. 예상치 못한 상황에서도 침착하게 대응해요.\n넘치는 에너지로 주변을 압도해요. 파워 넘치는 매력으로 인기가 많아요!"
        case 'ESFP':
            return "\n사교적이고 활발해요. 도토리 파티의 혼이라고 할 만큼 분위기 메이커예요!\n긍정적이고 낙천적이에요. 어떤 상황에서도 즐거움을 찾아내죠.\n예술적 감각이 뛰어나요. 노래, 춤, 연기 등 끼가 넘쳐요!\n현재를 즐길 줄 알아요. 지금 이 순간에 최선을 다해요.\n공감 능력이 높아요. 다른 도토리들과 감정을 나누는 것을 좋아해요.\n적응력이 강해요. 새로운 환경에 빠르게 적응하죠.\n관대하고 포용력이 있어요. 다른 도토리들의 실수도 잘 받아주는 편이에요.\n자유분방한 매력이 있어요. 틀에 박힌 삶보다는 자유를 추구해요!"
    }
}

function getGoodCompatibilityImagePath(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'Images/ESFP.png';
        case 'INTP':
            return 'Images/ESFJ.png';
        case 'ENTJ':
            return 'Images/ISFP.png';
        case 'ENTP':
            return 'Images/ISFJ.png';
        case 'INFJ':
            return 'Images/ESTP.png';
        case 'INFP':
            return 'Images/ESTJ.png';
        case 'ENFJ':
            return 'Images/ISTP.png';
        case 'ENFP':
            return 'Images/ISTJ.png';
        case 'ISTJ':
            return 'Images/ENFP.png';
        case 'ISFJ':
            return 'Images/ENTP.png';
        case 'ESTJ':
            return 'Images/INFP.png';
        case 'ESFJ':
            return 'Images/INTP.png';
        case 'ISTP':
            return 'Images/ENFJ.png';
        case 'ISFP':
            return 'Images/ENTJ.png';
        case 'ESTP':
            return 'Images/INFJ.png';
        case 'ESFP':
            return 'Images/INTJ.png';
    }
}

function getBadCompatibilityImagePath(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'Images/ESFJ.png';
        case 'INTP':
            return 'Images/ESFP.png';
        case 'ENTJ':
            return 'Images/ISFJ.png';
        case 'ENTP':
            return 'Images/ISFP.png';
        case 'INFJ':
            return 'Images/ESTJ.png';
        case 'INFP':
            return 'Images/ESTP.png';
        case 'ENFJ':
            return 'Images/ISTJ.png';
        case 'ENFP':
            return 'Images/ISTP.png';
        case 'ISTJ':
            return 'Images/ENFJ.png';
        case 'ISFJ':
            return 'Images/ENTJ.png';
        case 'ESTJ':
            return 'Images/INFJ.png';
        case 'ESFJ':
            return 'Images/INTJ.png';
        case 'ISTP':
            return 'Images/ENFP.png';
        case 'ISFP':
            return 'Images/ENTP.png';
        case 'ESTP':
            return 'Images/INFP.png';
        case 'ESFP':
            return 'Images/INTP.png';
    }
}

function getGoodCompatibility(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'ESFP';
        case 'INTP':
            return 'ESFJ';
        case 'ENTJ':
            return 'ISFP';
        case 'ENTP':
            return 'ISFJ';
        case 'INFJ':
            return 'ESTP';
        case 'INFP':
            return 'ESTJ';
        case 'ENFJ':
            return 'ISTP';
        case 'ENFP':
            return 'ISTJ';
        case 'ISTJ':
            return 'ENFP';
        case 'ISFJ':
            return 'ENTP';
        case 'ESTJ':
            return 'INFP';
        case 'ESFJ':
            return 'INTP';
        case 'ISTP':
            return 'ENFJ';
        case 'ISFP':
            return 'ENTJ';
        case 'ESTP':
            return 'INFJ';
        case 'ESFP':
            return 'INTJ';
    }
}

function getBadCompatibility(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'ESFJ';
        case 'INTP':
            return 'ESFP';
        case 'ENTJ':
            return 'ISFJ';
        case 'ENTP':
            return 'ISFP';
        case 'INFJ':
            return 'ESTJ';
        case 'INFP':
            return 'ESTP';
        case 'ENFJ':
            return 'ISTJ';
        case 'ENFP':
            return 'ISTP';
        case 'ISTJ':
            return 'ENFJ';
        case 'ISFJ':
            return 'ENTJ';
        case 'ESTJ':
            return 'INFJ';
        case 'ESFJ':
            return 'INTJ';
        case 'ISTP':
            return 'ENFP';
        case 'ISFP':
            return 'ENTP';
        case 'ESTP':
        case 'ESTP':
            return 'INFP';
        case 'ESFP':
            return 'INTP';
    }
}

function getSendMbtiImagePath(mbtiType) {
    switch (mbtiType) {
        case 'INTJ':
            return 'https://pbs.twimg.com/media/GQGhGpna0AAJvji?format=png&name=360x360';
        case 'INTP':
            return 'https://pbs.twimg.com/media/GQGhGpna0AAJvji?format=png&name=360x360';
        case 'ENTJ':
            return 'https://pbs.twimg.com/media/GQGg_6sbEAAK-Jh?format=png&name=360x360';
        case 'ENTP':
            return 'https://pbs.twimg.com/media/GQGg_6qaoAAREtX?format=png&name=360x360';
        case 'INFJ':
            return 'https://pbs.twimg.com/media/GQGhESwakAAouYE?format=png&name=360x360';
        case 'INFP':
            return 'https://pbs.twimg.com/media/GQGhGpna0AAJvji?format=png&name=360x360';
        case 'ENFJ':
            return 'https://pbs.twimg.com/media/GQGg_6qa8AARXjJ?format=png&name=360x360';
        case 'ENFP':
            return 'https://pbs.twimg.com/media/GQGg_7GboAA3kic?format=png&name=360x360';
        case 'ISTJ':
            return 'https://pbs.twimg.com/media/GQGhI4jakAAHWYj?format=png&name=360x360';
        case 'ISFJ':
            return 'https://pbs.twimg.com/media/GQGhGpna0AAJvji?format=png&name=360x360';
        case 'ESTJ':
            return 'https://pbs.twimg.com/media/GQGhESwaMAAbpFF?format=png&name=360x360';
        case 'ESFJ':
            return 'https://pbs.twimg.com/media/GQGhESva8AA_tdz?format=png&name=360x360';
        case 'ISTP':
            return 'https://pbs.twimg.com/media/GQGhI4ibsAALDQi?format=png&name=360x360';
        case 'ISFP':
            return 'https://pbs.twimg.com/media/GQGhI4ia0AA6Bsz?format=png&name=360x360';
        case 'ESTP':
            return 'https://pbs.twimg.com/media/GQGhESwakAAouYE?format=png&name=360x360';
        case 'ESFP':
            return 'https://pbs.twimg.com/media/GQGhESvaMAAs3ac?format=png&name=360x360';
    }
}

function restartTest() {
    currentQuestion = 0;
    mbtiScore = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
    progressBar.style.width = '0';
    progressBar.style.display = 'none';
}

function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}

document.getElementById('start-btn').addEventListener('click', startTest);
document.getElementById('restart-btn').addEventListener('click', restartTest);

function setKakaoLink(mbtiType) {
    const title = getMbtiTitle(mbtiType);
    const description = getMbtiDescription(mbtiType);
    const imageUrl = getSendMbtiImagePath(mbtiType);

    const content = {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
            mobileWebUrl: 'https://developers.kakao.com',
            androidExecParams: 'test',
        },
    };

    console.log(content.imageUrl);
    Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: content,
        buttons: [
            {
                title: '나의 도토리는 모디?🌰',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                },
            },
        ],
    });
}