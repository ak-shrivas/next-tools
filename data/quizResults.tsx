// data/quizResults.ts

export type Tool = {
  name: string;
  link: string;
  description: string;
};

export type Stream = "student" | "freelancer" | "9to5" | "founder" | "chill" | "default";

export type ResultType = {
  type: string;
  title: string;
  description: string;
  toolsByStream: {
    [key in Stream]?: Tool[];
  };
};

export const resultsMap: Record<string, ResultType> = {
  zen: {
    type: "zen",
    title: "Zen Master",
    description: "You’re calm, focused, and probably meditate between Pomodoro sessions.",
    toolsByStream: {
      student: [
        { name: "Notion", link: "https://notion.so", description: "Study notes + second brain." },
        { name: "Focus To-Do", link: "https://www.focustodo.cn/", description: "Pomodoro + task manager." },
      ],
      freelancer: [
        { name: "Serene", link: "https://sereneapp.com", description: "Plan your deep work." },
        { name: "KosmoTime", link: "https://www.kosmotime.com", description: "Time-block your hustle." },
      ],
      "9to5": [
        { name: "Flow Club", link: "https://flow.club", description: "Coworking for deep focus." },
        { name: "Toggl Track", link: "https://toggl.com/track/", description: "Track every minute calmly." },
      ],
      founder: [
        { name: "Reflect", link: "https://reflect.app", description: "Calm note-taking for visionaries." },
        { name: "Mindful Suite", link: "https://mindfulsuite.com", description: "Mindful focus for builders." },
      ],
      chill: [
        { name: "Headspace", link: "https://www.headspace.com", description: "Breathe, chill, reset." },
        { name: "Lofi.co", link: "https://lofi.co", description: "Zen lofi workspace." },
      ],
      default: [
        { name: "Serene", link: "https://sereneapp.com", description: "Goal-focused flow app." },
        { name: "Flow Club", link: "https://www.flow.club", description: "Virtual deep work rooms." },
      ],
    },
  },

  procrastinator: {
    type: "procrastinator",
    title: "The Procrastinator",
    description: "Deadlines are your adrenaline. You operate best with chaos breathing down your neck.",
    toolsByStream: {
      student: [
        { name: "Forest", link: "https://forestapp.cc", description: "Stay focused by growing trees." },
        { name: "RescueTime", link: "https://rescuetime.com", description: "Track time and guilt-trip yourself." },
      ],
      freelancer: [
        { name: "Cold Turkey", link: "https://getcoldturkey.com", description: "Block distractions hard." },
        { name: "Motion", link: "https://usemotion.com", description: "Auto-schedule procrastination away." },
      ],
      "9to5": [
        { name: "Clockify", link: "https://clockify.me", description: "Timesheets for your rescue." },
        { name: "Freedom", link: "https://freedom.to", description: "Block apps + websites, instant regret reducer." },
      ],
      founder: [
        { name: "Focusmate", link: "https://focusmate.com", description: "Accountability via strangers." },
        { name: "Sorted", link: "https://staysorted.com", description: "Hyper-scheduling chaos." },
      ],
      chill: [
        { name: "Lofi Pomodoro", link: "https://lofi.co", description: "Vibe + focus in one tab." },
        { name: "Momentum Dash", link: "https://momentumdash.com", description: "Guilt-tripping browser tab." },
      ],
      default: [
        { name: "Cold Turkey", link: "https://getcoldturkey.com", description: "Block distractions." },
        { name: "RescueTime", link: "https://rescuetime.com", description: "Time tracking for focus." },
      ],
    },
  },

  organized: {
    type: "organized",
    title: "The Planner",
    description: "You live by lists. You have a system for your systems.",
    toolsByStream: {
      student: [
        { name: "Todoist", link: "https://todoist.com", description: "Organize study life like a pro." },
        { name: "Google Calendar", link: "https://calendar.google.com", description: "Color-coded planner heaven." },
      ],
      freelancer: [
        { name: "Trello", link: "https://trello.com", description: "Drag your tasks into perfection." },
        { name: "ClickUp", link: "https://clickup.com", description: "All-in-one client + project manager." },
      ],
      "9to5": [
        { name: "Notion", link: "https://notion.so", description: "Master your meetings + tasks." },
        { name: "Slack GPT", link: "https://slack.com", description: "Organized chats. Almost." },
      ],
      founder: [
        { name: "Airtable", link: "https://airtable.com", description: "Visual databases = startup control." },
        { name: "Height", link: "https://height.app", description: "Startup-grade task manager." },
      ],
      chill: [
        { name: "Milanote", link: "https://milanote.com", description: "Visual boards to calm the storm." },
        { name: "Any.do", link: "https://any.do", description: "Simple planner for simple days." },
      ],
      default: [
        { name: "Notion", link: "https://notion.so", description: "All-in-one planning app." },
        { name: "TickTick", link: "https://ticktick.com", description: "Smart to-do list." },
      ],
    },
  },

  maniac: {
    type: "maniac",
    title: "The Chaos Wizard",
    description: "You make magic happen — even if it looks like mayhem from the outside.",
    toolsByStream: {
      student: [
        { name: "Mem", link: "https://mem.ai", description: "AI-powered messy note collector." },
        { name: "Obsidian", link: "https://obsidian.md", description: "Unstructured brilliance." },
      ],
      freelancer: [
        { name: "Descript", link: "https://descript.com", description: "Edit audio like a wizard." },
        { name: "Notion AI", link: "https://notion.so", description: "Your chaos, structured magically." },
      ],
      "9to5": [
        { name: "Raycast", link: "https://raycast.com", description: "Command-bar productivity for pros." },
        { name: "Magical", link: "https://www.getmagical.com", description: "Fill forms in one keystroke." },
      ],
      founder: [
        { name: "Tana", link: "https://tana.inc", description: "Wild ideas. Linked. Live." },
        { name: "Miro AI", link: "https://miro.com", description: "Brainstorm with controlled chaos." },
      ],
      chill: [
        { name: "Rewind AI", link: "https://www.rewind.ai", description: "Your life... searchable." },
        { name: "Heyday", link: "https://heyday.xyz", description: "Smart surf the web later." },
      ],
      default: [
        { name: "Reflect App", link: "https://reflect.app", description: "Daily notes for chaos." },
        { name: "Raycast", link: "https://raycast.com", description: "Command bar productivity." },
      ],
    },
  },
};
