import React, { useState } from 'react';

// 16가지 MBTI 성격 유형별 상세 데이터
const mbtiResults = {
  "ISTJ": { nickname: "청렴결백한 논리주의자", desc: "책임감이 강하고 현실적이며 철저한 계획파예요.", humor: "친구가 울며 전화할 때: '일단 자고 내일 아침 9시에 다시 얘기하자.'" },
  "ISFJ": { nickname: "용감한 수호자", desc: "주변 사람들을 조용하고 세심하게 챙겨주는 천사예요.", humor: "거절할 때: '아.. 그게.. (내가 거절하면 상처받겠지?) 좋.. 좋아! 할게!'" },
  "INFJ": { nickname: "선의의 옹호자", desc: "영감이 뛰어나고 통찰력 있게 세상을 보는 선비형이에요.", humor: "혼자 있을 때: '난 왜 태어났을까? 우주의 끝은 어디일까? (심오)'" },
  "INTJ": { nickname: "용의주도한 전략가", desc: "완벽주의를 지향하며 전략적으로 문제를 해결해요.", humor: "데이트할 때: '너의 칭찬은 논리적으로 타당하지 않아. 다시 말해줘.'" },
  "ISTP": { nickname: "만능 재주꾼", desc: "과묵하지만 상황 적응력이 뛰어나고 기계를 잘 다뤄요.", humor: "고민 상담: '그래서 결론이 뭐야? 고쳐줘? 아님 그냥 있어?'" },
  "ISFP": { nickname: "호기심 많은 예술가", desc: "말수가 적고 온화하며 따뜻한 감수성을 가졌어요.", humor: "약속 취소됐을 때: '(내심 기뻐하며) 아 진짜? 아쉽다.. (침대와 합체)'" },
  "INFP": { nickname: "열정적인 중재자", desc: "이상주의적이며 마음이 따뜻하고 상상력이 풍부해요.", humor: "길가다 넘어진 친구에게: '어떡해.. 너도 아프고 바닥도 아프겠다..'" },
  "INTP": { nickname: "논리적인 사색가", desc: "지식 수준이 높고 비평적인 관점을 가진 아이디어 뱅크예요.", humor: "관심 없는 얘기 들을 때: '아.. 진짜? (속마음: 효율성 없는 대화군...)'" },
  "ESTP": { nickname: "모험을 즐기는 사업가", desc: "에너지가 넘치고 순발력이 뛰어나며 현재를 즐겨요.", humor: "위급 상황: '일단 부딪쳐 보자고! 안 죽어 안 죽어!'" },
  "ESFP": { nickname: "자유로운 영혼의 연예인", desc: "어디서나 분위기 메이커이며 사람들과 노는 걸 좋아해요.", humor: "친구 만났을 때: '야!! 너 왜 이렇게 예뻐졌어!! 세상을 다 가진 기분이다!'" },
  "ENFP": { nickname: "재기발랄한 활동가", desc: "창의적이고 낙천적이며 항상 새로운 가능성을 찾아요.", humor: "첫 만남: '우리 왠지 전생에 베프였을 것 같아요! MBTI가 뭐예요?'" },
  "ENTP": { nickname: "뜨거운 논쟁을 즐기는 변론가", desc: "지적 호기심이 강하고 새로운 관점에서 도전하는 걸 즐겨요.", humor: "토론할 때: '그것도 일리 있지만.. 내 생각은 말이야 (지치지 않는 체력)'" },
  "ESTJ": { nickname: "엄격한 관리자", desc: "규칙을 준수하고 체계적으로 일을 추진하는 리더 타입이에요.", humor: "늦는 친구에게: '우리의 약속은 이미 3분 42초가 지났어. 벌칙 정해왔다.'" },
  "ESFJ": { nickname: "사교적인 외교관", desc: "다른 사람의 행복을 자신의 일처럼 기뻐하는 마당발이에요.", humor: "파티 준비: '너는 뭐 좋아해? 너는? 아, 모두가 행복한 메뉴로 다 시킬게!'" },
  "ENFJ": { nickname: "정의로운 사회운동가", desc: "카리스마가 넘치며 타인을 돕는 일에 앞장서는 열혈형이에요.", humor: "칭찬할 때: '넌 정말 우주의 보석 같은 존재야. 내가 항상 옆에 있을게!'" },
  "ENTJ": { nickname: "대담한 통찰가", desc: "비전을 제시하고 효율적으로 팀을 이끄는 카리스마 리더예요.", humor: "업무 지시: '자, 3초 안에 할 일 브리핑해. 목표는 세계 정복이다.'" },
};

// MBTI 질문 풀 (각 지표당 4개씩 총 16개)
const questionPool = {
  "EI": [
    { question: "주말에 약속이 없다면?", answers: [{ text: "집에 있는다.", type: "I" }, { text: "밖에 나가서 사람들을 만난다.", type: "E" }] },
    { question: "친구가 많아지는 것에 대해 나는?", answers: [{ text: "에너지가 소모된다고 느낀다.", type: "I" }, { text: "에너지를 얻는다고 느낀다.", type: "E" }] },
    { question: "모르는 사람과 대화할 때?", answers: [{ text: "먼저 말을 걸기가 어렵다.", type: "I" }, { text: "어색함 없이 말을 잘 건다.", type: "E" }] },
    { question: "사람들이 많은 파티에서 나는?", answers: [{ text: "빨리 집에 가고 싶어진다.", type: "I" }, { text: "시간 가는 줄 모르고 즐겁다.", type: "E" }] }
  ],
  "SN": [
    { question: "사물을 바라볼 때 나는?", answers: [{ text: "디테일을 먼저 본다 (나무 중심).", type: "S" }, { text: "전체 흐름을 먼저 본다 (숲 중심).", type: "N" }] },
    { question: "새로운 기계를 만졌을 때?", answers: [{ text: "설명서를 꼼꼼히 읽어본다.", type: "S" }, { text: "이것저것 눌러보며 익힌다.", type: "N" }] },
    { question: "멍을 때릴 때 나는?", answers: [{ text: "정말 아무 생각도 안 한다.", type: "S" }, { text: "꼬리에 꼬리를 무는 상상을 한다.", type: "N" }] },
    { question: "영화나 드라마를 볼 때?", answers: [{ text: "현실에서 일어날 법한 이야기가 좋다.", type: "S" }, { text: "판타지나 독특한 세계관이 더 좋다.", type: "N" }] }
  ],
  "TF": [
    { question: "친구가 힘들다고 할 때 나는?", answers: [{ text: "현실적인 해결책을 찾아준다.", type: "T" }, { text: "따뜻하게 공감하고 위로해준다.", type: "F" }] },
    { question: "누군가에게 피드백을 줄 때 나는?", answers: [{ text: "잘못된 점을 정확히 짚어준다.", type: "T" }, { text: "상대가 상처받지 않게 돌려 말한다.", type: "F" }] },
    { question: "친구가 사고 났다고 연락했다면?", answers: [{ text: "보험은 들었는지 먼저 물어본다.", type: "T" }, { text: "어디 안 다쳤는지 먼저 걱정한다.", type: "F" }] },
    { question: "논쟁이 벌어졌을 때 나는?", answers: [{ text: "논리적으로 반박해서 이기고 싶다.", type: "T" }, { text: "관계를 생각해서 적당히 마무리한다.", type: "F" }] }
  ],
  "JP": [
    { question: "약속 장소에 갈 때 나는?", answers: [{ text: "미리 경로와 시간을 확인한다.", type: "J" }, { text: "출발하면서 길을 찾는다.", type: "P" }] },
    { question: "과제를 제출할 때 스타일은?", answers: [{ text: "미리 끝내고 검토까지 마친다.", type: "J" }, { text: "마감 직전에 집중해서 끝낸다.", type: "P" }] },
    { question: "여행 갈 때 짐을 챙길 때?", answers: [{ text: "리스트를 적어서 꼼꼼히 챙긴다.", type: "J" }, { text: "필요할 것 같은 걸 대충 집어넣는다.", type: "P" }] },
    { question: "갑자기 무언가 결정해야 할 때?", answers: [{ text: "기존의 틀이나 원칙에 따라 정한다.", type: "J" }, { text: "그때의 기분이나 상황에 맞게 정한다.", type: "P" }] }
  ]
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [step, setStep] = useState(0); 
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ E: 0, S: 0, T: 0, J: 0 });

  const allTypes = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
  ];

  const handleStart = () => {
    const selected = [
      ...shuffle(questionPool.EI).slice(0, 2),
      ...shuffle(questionPool.SN).slice(0, 2),
      ...shuffle(questionPool.TF).slice(0, 2),
      ...shuffle(questionPool.JP).slice(0, 2),
    ];
    const randomizedQuestions = shuffle(selected).map(q => ({
      ...q,
      answers: shuffle(q.answers)
    }));
    setQuestions(randomizedQuestions);
    setScores({ E: 0, S: 0, T: 0, J: 0 });
    setCurrentIndex(0);
    setStep(1);
  };

  const handleAnswer = (type) => {
    if (["E", "S", "T", "J"].includes(type)) {
      setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
    const nextIdx = currentIndex + 1;
    if (nextIdx < questions.length) setCurrentIndex(nextIdx);
    else setStep(2);
  };

  const calculateDegree = () => {
    let res = "";
    res += scores.E >= 1 ? "E" : "I";
    res += scores.S >= 1 ? "S" : "N";
    res += scores.T >= 1 ? "T" : "F";
    res += scores.J >= 1 ? "J" : "P";
    return res;
  };

  if (step === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbfb] p-4 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 flex flex-col items-center space-y-10 border border-slate-100">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-[30px] flex items-center justify-center text-5xl shadow-lg transform rotate-6 animate-pulse">🌟</div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">나의 진짜<br/>성격은 무엇일까?</h1>
            <p className="text-slate-500 font-medium text-lg px-4">랜덤 질문으로 더 정확하게 알아보는<br/>프리미엄 MBTI 테스트</p>
          </div>
          <button onClick={handleStart} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-xl transition-all active:scale-95 text-xl tracking-tighter">테스트 시작하기</button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    const q = questions[currentIndex];
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl p-8 space-y-8 flex flex-col min-h-[550px] border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center text-[10px] font-black text-indigo-400 uppercase tracking-widest px-2">
            <span className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Question {currentIndex + 1}/8</span>
            <span>Progress {Math.round(((currentIndex + 1) / 8) * 100)}%</span>
          </div>
          <h2 className="text-2xl font-bold text-center leading-snug flex-grow flex items-center justify-center px-4 break-keep">{q.question}</h2>
          <div className="space-y-4 px-2">
            {q.answers.map((ans, i) => (
              <button 
                key={i} 
                className="w-full p-6 text-left border-2 border-slate-50 rounded-3xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-bold text-lg active:scale-[0.98] bg-slate-50/50 shadow-sm"
                onClick={() => handleAnswer(ans.type)}
              >
                {ans.text}
              </button>
            ))}
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full transition-all duration-700 shadow-sm" style={{ width: `${((currentIndex + 1) / 8) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  const finalType = calculateDegree();
  const info = mbtiResults[finalType] || { nickname: "준비 중", desc: "...", humor: "..." };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-6 font-sans overflow-auto py-12">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center lg:items-stretch animate-in zoom-in-95 duration-700">
        
        {/* [왼쪽] 4x4 전체 유형 그리드 */}
        <div className="bg-white rounded-[60px] shadow-2xl p-10 border border-slate-100 flex-1 w-full max-w-2xl">
          <div className="text-center mb-8">
            <h3 className="text-indigo-600 font-black text-xl uppercase tracking-[0.3em]">MBTI World Map</h3>
            <p className="text-slate-400 text-sm font-bold">16가지 캐릭터들을 한눈에 확인해 보세요!</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {allTypes.map((type) => {
              const isUserResult = type === finalType;
              return (
                <div 
                  key={type}
                  className={`relative flex flex-col items-center p-4 rounded-[25px] transition-all duration-700
                    ${isUserResult 
                      ? 'bg-indigo-600 shadow-2xl shadow-indigo-200 scale-105 z-10 border-4 border-white' 
                      : 'bg-slate-50 opacity-40 hover:opacity-90 grayscale hover:grayscale-0'}`}
                >
                  <img 
                    src={`/mbti_${type}.png`} 
                    alt={type} 
                    className={`w-full h-auto aspect-square object-contain rounded-2xl drop-shadow-md
                      ${isUserResult ? 'brightness-110' : ''}`}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                  <span className={`text-[12px] font-black mt-3 tracking-tighter ${isUserResult ? 'text-white' : 'text-slate-400'}`}>
                    {type}
                  </span>
                  {isUserResult && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-white text-[10px] font-black px-3 py-1 rounded-full animate-bounce shadow-lg border-2 border-white">
                      YOURS!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* [오른쪽] 상세 결과 가이드 */}
        <div className="max-w-md w-full bg-white rounded-[60px] shadow-2xl border-[6px] border-indigo-600 p-12 flex flex-col space-y-10 items-center text-center">
           <div className="space-y-3">
              <p className="text-indigo-500 font-black uppercase tracking-[0.2em] text-xs">Personality Result</p>
              <h1 className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-indigo-900 tracking-tighter italic leading-none py-4">
                {finalType}
              </h1>
           </div>

           <div className="w-full space-y-6">
              <div className="bg-indigo-50 p-6 rounded-[35px] border border-indigo-100 shadow-inner">
                <h4 className="text-indigo-600 font-bold mb-2 uppercase text-xs tracking-widest">Nickname</h4>
                <p className="text-xl font-black text-slate-800 break-keep">"{info.nickname}"</p>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-[35px] border border-slate-100 text-left">
                <p className="text-slate-600 font-semibold leading-relaxed text-sm break-keep">
                  {info.desc}
                </p>
              </div>

              <div className="p-6 bg-yellow-50 rounded-[30px] border-2 border-dashed border-yellow-200 relative">
                <div className="absolute -top-3 left-6 bg-yellow-400 text-white text-[10px] font-black px-3 py-1 rounded-full">SCENARIO</div>
                <p className="text-slate-800 text-sm italic font-medium">"{info.humor}"</p>
              </div>
           </div>

           <div className="w-full space-y-4">
              <button 
                onClick={() => setStep(0)} 
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black rounded-3xl text-xl shadow-xl transition-all active:scale-95"
              >
                테스트 다시하기
              </button>
              <p className="text-[10px] text-slate-300 font-bold tracking-[0.5em] uppercase">Built with AI Intelligence</p>
           </div>
        </div>

      </div>
    </div>
  );
}

export default App;
