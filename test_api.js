async function test() {
  const fetch = globalThis.fetch;
  const endpoint = "https://q5j3ckrjwl7dtncyil2ihkqlpy0ndeao.lambda-url.eu-north-1.on.aws/";
  
  const payloads = [
    { name: "message as string", body: { message: "hi" } },
    { name: "messages array", body: { messages: [{role: "user", content: "hi"}] } },
    { name: "message and systemPrompt", body: { message: "hi", systemPrompt: "You are a pirate." } },
    { name: "message and history", body: { message: "What did I say?", history: [{role: "user", content: "I said banana"}] } }
  ];

  for (const p of payloads) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p.body)
      });
      const data = await res.json();
      console.log(`\n--- ${p.name} ---`);
      console.log(data);
    } catch(e) {
      console.error(e);
    }
  }
}

test();
