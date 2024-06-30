export default class Action {
    next;

    constructor (actionData) {
        this.action = actionData["perform"];
        this.next = actionData["next"];
    }
}

export class Talk {
    say;
    answer;

    constructor (talkData) {
        this.say = talkData["say"];
        this.answer = talkData["answer"];
    }
}

export class Dialog extends Action {
    talks = [];

    constructor(actionData) {
        super(actionData);
        actionData["dialog"].forEach(talkData => {
            this.talks.push(new Talk(talkData))
        });
    }
}