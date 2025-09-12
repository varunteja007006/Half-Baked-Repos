const PROBLEMS_ROUTE = `/react-problems`;

const data = [
  {
    title: "Delayed Input",
    statement: [
      `    
        Problem Statement: When user inputs text it should register it slow.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/delayed-input`,
    githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/delayed-input/page.tsx`,
  },
  {
    title: "Fetch Data Again, Again & Again...",
    statement: [
      `    
       Problem Statement: They provided an URL, we need to fetch the data from that URL every 
       one minute.`,
      `Conditions: Create a custom hook which will take the given URL as an input and 
       returns the output. Main component should use the custom hook to get the result 
       and display the output.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/fetch-again`,
    githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/fetch-again/page.tsx`,
  },
  {
    title: "Timer",
    statement: [
      `    
       Problem Statement: Problem statement: Create a timer. Add functionality to start, stop & reset the timer.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/timer-problem`,
    githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Chess Board",
    statement: [
      `    
       Problem Statement: Create a chess board, then on hover of each cell highlight the path of the bishop.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/chess-board`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Reset clicks",
    statement: [
      `    
       Problem Statement: User clicks on the buttons and you have to reset the clicks.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/reset-clicks`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Carousel",
    statement: [
      `    
       Problem Statement: Create a carousel, that auto scrolls every 1.5seconds and also provide buttons to scroll left and right.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/carousel`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Pagination",
    statement: [
      `    
       Problem Statement: Create a pagination to display products.
      `,
      `Prev and Next button should be disabled if there are no pages to navigate, also highlight the current page.`,
    ],
    url: `${PROBLEMS_ROUTE}/pagination`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Traffic Light",
    statement: [
      `    
       Problem Statement: Create a traffic light that toggles between the red, yellow and green color.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/traffic-light`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Simple Form",
    statement: [
      `    
       Problem Statement: Create a simple form with name, email and password.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/simple-form`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Swap the odds",
    statement: [
      `    
       Problem Statement: You will have two carts. Each cart will have 5 different items .Add a button on the screen, on click of the button swap only the odd item from cart A, with odd items in cart B.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/swap-the-odds`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Excel Mock Up",
    statement: [
      `    
       Problem Statement: Create an excel mock up. 
      `,
      `Add row and col buttons`,
      `Ability to input the data in the cells`,
    ],
    url: `${PROBLEMS_ROUTE}/excel-mock-up`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Progress bar",
    statement: [
      `    
       Problem Statement: Create a progress bar. 
      `,
    ],
    url: `${PROBLEMS_ROUTE}/progress-bar`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Google Search",
    statement: [
      `    
       Problem Statement: Create a Google Search. 
      `,
    ],
    url: `${PROBLEMS_ROUTE}/google-search`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
  {
    title: "Folder Tree",
    statement: [
      `    
       Problem Statement: Create a folder tree to display hierarchical folder structures.
      `,
    ],
    url: `${PROBLEMS_ROUTE}/folder-tree`,
    // githubURL: `${process.env.NEXT_PUBLIC_GITHUB_URL}/Practice_React_Next/blob/main/app/react-problems/timer-problem/page.tsx`,
  },
];

export const problems_data = data.sort((a, b) =>
  a.title.localeCompare(b.title)
);
