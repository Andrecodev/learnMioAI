"use client";
import React, { useEffect, useState } from "react";

export default function LessonPage({ params }: { params: { id: string } }) {
  const [lesson, setLesson] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const id = params.id;

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then((r) => r.json())
      .then(setLesson)
      .catch(console.error);
  }, [id]);

  function handleSelect(qIndex: number, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  }

  async function handleSubmit() {
    // simple local scoring; server stub could save analytics
    if (!lesson?.quiz) return;
    let correct = 0;
    lesson.quiz.forEach((q: any, i: number) => {
      if (q.answer === answers[i]) correct++;
    });
    setSubmitted(true);
    // Optionally POST results to server
    await fetch(`/api/lessons/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        score: correct,
        total: lesson.quiz.length,
      }),
    }).catch(() => {});
  }

  if (!lesson) return <div>Loading lesson...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{lesson.title}</h1>
      <h3>Summary</h3>
      <div dangerouslySetInnerHTML={{ __html: lesson.summary }} />

      {lesson.assets?.audio && (
        <div>
          <h4>Audio</h4>
          <audio controls src={lesson.assets.audio} />
        </div>
      )}

      {lesson.assets?.images && (
        <div>
          <h4>Images</h4>
          {lesson.assets.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`img-${i}`}
              style={{ maxWidth: 300, marginRight: 8 }}
            />
          ))}
        </div>
      )}

      {lesson.quiz && (
        <div>
          <h3>Quiz</h3>
          {lesson.quiz.map((q: any, i: number) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div>
                {i + 1}. {q.q}
              </div>
              <div>
                {q.options.map((opt: string, oi: number) => (
                  <label key={oi} style={{ display: "block" }}>
                    <input
                      type="radio"
                      name={`q-${i}`}
                      onChange={() => handleSelect(i, oi)}
                      checked={answers[i] === oi}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <div>Submitted! Check results saved.</div>
          )}
        </div>
      )}
    </div>
  );
}
