const OpenAI = require('openai');
const openai = new OpenAI();

const chat = async (req, res) => {
    let messages = [];
    if(req.body.messages){
        messages = req.body.messages;
    }
    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": "you are mediBot, a bot that can understands the patients pain points and medical problems that they are facing. Talk to them like a adviser and suggest them what they should do and what type of doctors they should visit. and also the high level doubts they may have. Do not get to technical with them. the next prompts will be a patients conversation only. talk to them like that only. keep your answers short and easy to understand." },
        ...messages],
        model: "gpt-3.5-turbo",
    });
    res.json({ message: completion.choices[0].message.content });
}

module.exports = chat;