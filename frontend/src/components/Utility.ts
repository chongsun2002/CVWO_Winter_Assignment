export const topicFormat = (topicString: string): string => {
    switch(topicString) {
        case "academics": {
            return "Academics";
        }
        case "activitiesevents": {
            return "Activities & Events";
        }
        case "recruitment": {
            return "Recruitment";
        }
        case "clubsocs": {
            return "Clubs & Societies";
        }
        case "social": {
            return "Social";
        }
        default: {
            return "Others";
        }
    }
}