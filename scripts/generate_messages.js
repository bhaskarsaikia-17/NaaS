const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '../messages.json');
let existingMessages = [];

try {
    existingMessages = require(messagesPath);
} catch (error) {
    console.warn("Could not load existing messages, starting fresh if file doesn't exist.", error.message);
}

const subjects = [
    "My calendar", "The universe", "My schedule", "My internal battery", "My cat", "The stars",
    "My fortune cookie", "My magic 8-ball", "The prophecy", "My lawyer", "My therapist",
    "My future self", "The simulation", "My procrastination demon", "The vibes", "My chakra",
    "My coffee grounds", "The tea leaves", "My spirit guide", "The algorithm"
];

const verbs = [
    "says", "indicates", "screams", "whispers", "predicts", "dictates", "demands",
    "suggests", "confirms", "foresees", "insists on", "strictly forbids", "strongly advises",
    "has calculated", "is aligning towards", "is trending towards", "has decided upon", "is projecting"
];

const objects = [
    "a hard no", "a firm decline", "an absolute refusal", "zero chance", "impossible odds",
    "a negative outcome", "a rain check forever", "total avoidance", "complete disengagement",
    "strategic retreat", "passive resistance", "non-participation", "staying home",
    "doing absolutely nothing", "social distancing from this", "hibernation", "an emphatic nope"
];

const reasons = [
    "for legal reasons.", "to save the timeline.", "because I said so.", "due to unforeseen laziness.",
    "for the greater good.", "to prevent chaos.", "because Mercury is in retrograde.",
    "due to a lack of interest.", "because I'm busy staring at a wall.", "judging by the weather.",
    "because my bed is possessive.", "due to a shortage of enthusiasm.", "to conserve vital energy.",
    "because I'm allergic to effort.", "as part of my new lifestyle.", "according to my horoscope.",
    "to maintain my mystery.", "because I'm currently rebooting.", "due to a glitch in the matrix.",
    "because the plot demands it."
];

const intros = [
    "Regrettably,", "Unfortunately,", "Interestingly,", "Surprisingly,", "As expected,",
    "Spoiler alert:", "Breaking news:", "For your information,", "Please note:", "Just so you know,",
    "Truth be told,", "To be honest,", "Don't take this personally but", "I hate to say it but",
    "Here is the thing:", "After much consideration,", "Upon reflection,", "My final answer is:"
];

function generateMessage() {
    const template = Math.floor(Math.random() * 4);

    // Template 0: Subject + Verb + Object + Reason
    if (template === 0) {
        const s = subjects[Math.floor(Math.random() * subjects.length)];
        const v = verbs[Math.floor(Math.random() * verbs.length)];
        const o = objects[Math.floor(Math.random() * objects.length)];
        const r = reasons[Math.floor(Math.random() * reasons.length)];
        return `${s} ${v} ${o} ${r}`;
    }

    // Template 1: Intro + Subject + Verb + Object
    if (template === 1) {
        const i = intros[Math.floor(Math.random() * intros.length)];
        const s = subjects[Math.floor(Math.random() * subjects.length)];
        const v = verbs[Math.floor(Math.random() * verbs.length)];
        const o = objects[Math.floor(Math.random() * objects.length)];
        return `${i} ${s} ${v} ${o}.`;
    }

    // Template 2: Intro + Reason (Standalone)
    if (template === 2) {
        const i = intros[Math.floor(Math.random() * intros.length)];
        const r = reasons[Math.floor(Math.random() * reasons.length)];
        // minor grammar fix: remove the period from reason if it's there to flow better? 
        // Actually reasons have periods. Let's strip the last char if it is a period.
        const cleanReason = r.endsWith('.') ? r.slice(0, -1) : r;
        return `${i} I can't ${cleanReason}.`;
    }

    // Template 3: "I would but" style
    if (template === 3) {
        const excuses = [
            "I'm training my goldfish.", "I'm counting the pixels on my screen.",
            "I'm waiting for a package that isn't coming.", "I'm auditing my sock drawer.",
            "I'm practicing my silence.", "I'm focusing on my breathing.",
            "I'm busy existing.", "I'm holding the floor down.",
            "I'm testing gravity.", "I'm supervising the dust motes."
        ];
        const excuse = excuses[Math.floor(Math.random() * excuses.length)];
        return `I would, but ${excuse}`;
    }
}

const newMessages = new Set(existingMessages);
// Start count
const startCount = newMessages.size;
const TARGET_ADDITIONAL = 3000;

console.log(`Starting with ${startCount} messages.`);

let added = 0;
while (added < TARGET_ADDITIONAL) {
    const msg = generateMessage();
    if (!newMessages.has(msg)) {
        newMessages.add(msg);
        added++;
    }
}

console.log(`Generated ${added} new unique messages.`);
console.log(`Total messages: ${newMessages.size}`);

const finalArray = Array.from(newMessages);

fs.writeFileSync(messagesPath, JSON.stringify(finalArray, null, 4));
console.log(`Saved to ${messagesPath}`);
