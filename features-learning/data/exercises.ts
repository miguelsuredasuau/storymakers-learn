/**
 * Exercise Data
 *
 * Comprehensive exercises for all chapters of the Storymakers Method.
 * Exercises are organized by chapter and section for easy import.
 */

// Exercise types
interface BaseExercise {
  exerciseId: string;
  chapterId: string;
  stepId: string;
  question: string;
  hint?: string;
  explanation?: string;
}

type MultipleChoiceExercise = BaseExercise & {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
};

type ReflectionExercise = BaseExercise & {
  type: "reflection";
  minLength?: number;
};

type TrueFalseExercise = BaseExercise & {
  type: "true-false";
  correctAnswer: boolean;
};

type ExerciseData =
  | MultipleChoiceExercise
  | ReflectionExercise
  | TrueFalseExercise;

// ============================================================================
// LAYERS CHAPTER EXERCISES
// ============================================================================

export const LAYERS_EXERCISES: Record<string, ExerciseData> = {
  // Blocks section
  blocksGoalsCheck: {
    exerciseId: "layers-blocks-goals",
    chapterId: "LAYERS",
    stepId: "blocks-goals",
    type: "multiple-choice",
    question:
      "What is the primary purpose of defining 'Blocks' in a presentation?",
    options: [
      "To create visual slide layouts",
      "To define strategic themes that create the desired impact",
      "To format bullet points consistently",
      "To set up slide transitions",
    ],
    correctIndex: 1,
    hint: "Think about the highest level of presentation structure.",
    explanation:
      "Blocks define the strategic themes or major sections of your presentation. They're the foundation that shapes your narrative and determines how you'll build your argument.",
  },

  blocksArcSelection: {
    exerciseId: "layers-blocks-arc",
    chapterId: "LAYERS",
    stepId: "blocks-arcs",
    type: "multiple-choice",
    question: "Which story arc would be best for a startup investor pitch?",
    options: [
      "The Sparkline - alternating between 'what is' and 'what could be'",
      "The Sequoia Pitch - systematic coverage of all investor concerns",
      "The Onion - peeling back layers to reveal a core insight",
      "Comedy - confusion resolving into clarity",
    ],
    correctIndex: 1,
    explanation:
      "The Sequoia Pitch structure was designed by Sequoia Capital specifically for investor presentations, covering all the key concerns investors have in a systematic way.",
  },

  blocksReflection: {
    exerciseId: "layers-blocks-reflection",
    chapterId: "LAYERS",
    stepId: "blocks",
    type: "reflection",
    question:
      "Think about a presentation you've given recently. How many distinct 'blocks' or major themes did it have? Were they clearly defined, or did the content blur together?",
    minLength: 50,
    explanation:
      "Most presentations benefit from 2-4 clear blocks. If you had more, some might be combined; if fewer, you might need more supporting arguments.",
  },

  // Loops section
  loopsHeaderTest: {
    exerciseId: "layers-loops-headers",
    chapterId: "LAYERS",
    stepId: "loops-goals",
    type: "true-false",
    question:
      "In a well-structured Loop, reading just the slide headers should tell the complete story.",
    correctAnswer: true,
    explanation:
      "This is the 'headline test' - the most important quality check for Loops. If someone can understand your argument just from the headers, your logical flow is sound.",
  },

  loopsPointCount: {
    exerciseId: "layers-loops-points",
    chapterId: "LAYERS",
    stepId: "loops",
    type: "multiple-choice",
    question: "How many main points should a single Loop make?",
    options: [
      "As many as needed to cover the topic",
      "Exactly one clear point",
      "Three to five supporting points",
      "Two contrasting points",
    ],
    correctIndex: 1,
    hint: "Focus and clarity are key.",
    explanation:
      "Each Loop should validate one assumption or make one key argument. Multiple points in a single loop create confusion and weaken your argument.",
  },

  loopsReasoningApproach: {
    exerciseId: "layers-loops-reasoning",
    chapterId: "LAYERS",
    stepId: "loops-arcs",
    type: "multiple-choice",
    question:
      "You have strong data from multiple sources pointing to the same conclusion. Which reasoning approach should you use?",
    options: [
      "Deductive - premise leads to premise leads to conclusion",
      "Inductive - multiple evidence points reveal a pattern",
      "Neither - just show the data",
      "Both mixed together",
    ],
    correctIndex: 1,
    explanation:
      "When you have multiple pieces of evidence pointing to a conclusion, inductive reasoning (The Pattern Hunter arc) is most effective. Deductive works better when you have premises that logically lead to a conclusion.",
  },

  // Slides section
  slidesThreeSecond: {
    exerciseId: "layers-slides-3sec",
    chapterId: "LAYERS",
    stepId: "slides-goals",
    type: "true-false",
    question:
      "The '3-second rule' means each slide should only be displayed for 3 seconds.",
    correctAnswer: false,
    explanation:
      "The 3-second rule means someone should be able to grasp the main point of a slide within 3 seconds of seeing it - not that slides should only be shown briefly.",
  },

  slidesActionTitle: {
    exerciseId: "layers-slides-title",
    chapterId: "LAYERS",
    stepId: "slides",
    type: "multiple-choice",
    question: "Which is the best example of an action title?",
    options: [
      "Q3 Sales Results",
      "Market Analysis",
      "Sales jumped 40% after the new campaign launched",
      "Revenue Overview",
    ],
    correctIndex: 2,
    hint: "Action titles state an insight, not just a topic.",
    explanation:
      "'Sales jumped 40% after the new campaign launched' states a specific insight. The other options are topic titles that don't communicate any conclusion or finding.",
  },

  slidesOneIdea: {
    exerciseId: "layers-slides-idea",
    chapterId: "LAYERS",
    stepId: "slides-goals",
    type: "multiple-choice",
    question: "How do you know if a slide has too many ideas?",
    options: [
      "It has more than 5 bullet points",
      "The font size is too small",
      "You need the word 'and' in your title",
      "It takes more than 10 seconds to create",
    ],
    correctIndex: 2,
    hint: "Focus on the title as an indicator.",
    explanation:
      "If you need 'and' in your slide title, you likely have two ideas that should be split into separate slides. One slide = one idea.",
  },
};

// ============================================================================
// AGENTS CHAPTER EXERCISES
// ============================================================================

export const AGENTS_EXERCISES: Record<string, ExerciseData> = {
  // Architect
  architectPurpose: {
    exerciseId: "agents-architect-purpose",
    chapterId: "AGENTS",
    stepId: "architect-role",
    type: "multiple-choice",
    question: "What is the Architect's primary concern?",
    options: [
      "Making slides visually appealing",
      "Building emotional connection with the audience",
      "Ensuring logical structure and sound reasoning",
      "Creating memorable moments",
    ],
    correctIndex: 2,
    explanation:
      "The Architect mindset focuses on logic, structure, and ensuring that arguments are sound and well-organized. It's about building a solid foundation for your presentation.",
  },

  architectMECE: {
    exerciseId: "agents-architect-mece",
    chapterId: "AGENTS",
    stepId: "architect-patterns",
    type: "true-false",
    question: "MECE stands for 'Mutually Exclusive, Collectively Exhaustive'.",
    correctAnswer: true,
    hint: "This is a core consulting framework.",
    explanation:
      "MECE is a principle that ensures your categories don't overlap (mutually exclusive) and cover everything (collectively exhaustive). It's essential for clear, comprehensive argumentation.",
  },

  architectReflection: {
    exerciseId: "agents-architect-reflection",
    chapterId: "AGENTS",
    stepId: "architect",
    type: "reflection",
    question:
      "When have you experienced a presentation where the logical structure fell apart? What happened, and how did it affect your understanding?",
    minLength: 50,
    explanation:
      "Poor structure often leads to confusion, distrust, or disengagement. Recognizing these moments helps you appreciate the Architect's role.",
  },

  // Storyteller
  storytellerPurpose: {
    exerciseId: "agents-storyteller-purpose",
    chapterId: "AGENTS",
    stepId: "storyteller-role",
    type: "multiple-choice",
    question: "What is the Storyteller's primary focus?",
    options: [
      "Data accuracy and precision",
      "Visual hierarchy and layout",
      "Creating emotional engagement and narrative arc",
      "Structuring logical arguments",
    ],
    correctIndex: 2,
    explanation:
      "The Storyteller mindset is about emotion, narrative, and connection. It transforms dry facts into compelling stories that move people to action.",
  },

  storytellerTension: {
    exerciseId: "agents-storyteller-tension",
    chapterId: "AGENTS",
    stepId: "storyteller-patterns",
    type: "true-false",
    question:
      "A presentation without tension is boring because humans are wired to pay attention to conflict and resolution.",
    correctAnswer: true,
    explanation:
      "Our brains are hardwired to pay attention to conflict and anticipate resolution. Tension keeps audiences engaged and makes your resolution more satisfying.",
  },

  storytellerArc: {
    exerciseId: "agents-storyteller-arc",
    chapterId: "AGENTS",
    stepId: "storyteller",
    type: "multiple-choice",
    question: "In the Hero's Journey framework, who is typically the 'hero'?",
    options: [
      "The presenter",
      "The company",
      "The audience",
      "The product or solution",
    ],
    correctIndex: 2,
    hint: "Effective presentations put the focus elsewhere...",
    explanation:
      "The audience should be positioned as the hero of the story. The presenter acts as a guide or mentor, helping them overcome challenges and reach transformation.",
  },

  // Designer
  designerPurpose: {
    exerciseId: "agents-designer-purpose",
    chapterId: "AGENTS",
    stepId: "designer-role",
    type: "multiple-choice",
    question: "What is the Designer's primary goal?",
    options: [
      "Making everything look pretty",
      "Maximizing signal and minimizing noise for clarity",
      "Adding as many visuals as possible",
      "Following the latest design trends",
    ],
    correctIndex: 1,
    explanation:
      "The Designer mindset is about visual clarity and impact. It's not about decoration - it's about ensuring the message lands instantly through effective visual communication.",
  },

  designerDataInk: {
    exerciseId: "agents-designer-dataink",
    chapterId: "AGENTS",
    stepId: "designer-patterns",
    type: "true-false",
    question:
      "The 'data-ink ratio' principle suggests removing any visual elements that don't directly support the message.",
    correctAnswer: true,
    hint: "Think about what Tufte would say.",
    explanation:
      "Edward Tufte's data-ink ratio principle states that ink should be used for data, not decoration. Every visual element should earn its place by contributing to understanding.",
  },

  designerSquintTest: {
    exerciseId: "agents-designer-squint",
    chapterId: "AGENTS",
    stepId: "designer",
    type: "multiple-choice",
    question: "What does the 'squint test' help you evaluate?",
    options: [
      "Whether the colors are aesthetically pleasing",
      "Whether the visual hierarchy is clear and the main message stands out",
      "Whether the slide is readable at a distance",
      "Whether animations are smooth",
    ],
    correctIndex: 1,
    hint: "It's about what stands out when details blur.",
    explanation:
      "When you squint at a slide, details blur but visual hierarchy becomes clear. If the most important element doesn't stand out, your visual hierarchy needs work.",
  },
};

// ============================================================================
// FRAMEWORK CHAPTER EXERCISES
// ============================================================================

export const FRAMEWORK_EXERCISES: Record<string, ExerciseData> = {
  // Step 0 - SCQA
  step0SCQA: {
    exerciseId: "framework-step0-scqa",
    chapterId: "FRAMEWORK",
    stepId: "step-0",
    type: "multiple-choice",
    question: "What does SCQA stand for?",
    options: [
      "Story, Content, Question, Answer",
      "Situation, Complication, Question, Answer",
      "Structure, Clarity, Quality, Action",
      "Summary, Context, Quotation, Analysis",
    ],
    correctIndex: 1,
    explanation:
      "SCQA (Situation, Complication, Question, Answer) is a powerful framework for opening any presentation. It establishes context, creates tension, and promises resolution.",
  },

  // Step 1 - Emotional Journey
  step1Emotion: {
    exerciseId: "framework-step1-emotion",
    chapterId: "FRAMEWORK",
    stepId: "step-1",
    type: "true-false",
    question:
      "The emotional journey in a presentation should be a steady, consistent feeling throughout.",
    correctAnswer: false,
    explanation:
      "Effective presentations create contrast between 'what is' and 'what could be', alternating between tension and resolution. A flat emotional line is boring.",
  },

  // Step 2 - Pyramid Principle
  step2Pyramid: {
    exerciseId: "framework-step2-pyramid",
    chapterId: "FRAMEWORK",
    stepId: "step-2",
    type: "multiple-choice",
    question:
      "According to the Pyramid Principle, where should your main conclusion appear?",
    options: [
      "At the end, as a big reveal",
      "At the start, then supported by evidence",
      "Only in the executive summary",
      "Implied but never explicitly stated",
    ],
    correctIndex: 1,
    hint: "Think about busy executives...",
    explanation:
      "The Pyramid Principle (Barbara Minto) recommends leading with your conclusion, then supporting it with arguments and evidence. This respects your audience's time.",
  },

  // Step 3 - Arc Matrix
  step3Arc: {
    exerciseId: "framework-step3-arc",
    chapterId: "FRAMEWORK",
    stepId: "step-3",
    type: "multiple-choice",
    question:
      "The Arc Matrix helps you choose the right narrative structure based on:",
    options: [
      "The number of slides you need",
      "Your audience type and your intention",
      "The visual assets available",
      "The meeting room size",
    ],
    correctIndex: 1,
    explanation:
      "The Arc Matrix maps audience types (skeptics, believers, etc.) against intentions (inform, persuade, inspire) to recommend the most effective narrative arc for your situation.",
  },

  // Step 4 - Sequences
  step4Flow: {
    exerciseId: "framework-step4-flow",
    chapterId: "FRAMEWORK",
    stepId: "step-4",
    type: "true-false",
    question:
      "When sequencing arguments, the order doesn't matter as long as all points are covered.",
    correctAnswer: false,
    explanation:
      "Sequence matters enormously. The order in which you present information affects comprehension, retention, and persuasion. Strategic sequencing builds momentum.",
  },

  // Step 5 - Rhythm
  step5Rhythm: {
    exerciseId: "framework-step5-rhythm",
    chapterId: "FRAMEWORK",
    stepId: "step-5",
    type: "multiple-choice",
    question: "What is the purpose of varying rhythm in a presentation?",
    options: [
      "To show off different slide layouts",
      "To keep the audience awake",
      "To create contrast and maintain engagement through pacing",
      "To make the presentation longer",
    ],
    correctIndex: 2,
    explanation:
      "Rhythm variations create contrast and manage attention. Fast sections build energy, slow sections allow processing. This is the 'sparkline' concept in action.",
  },

  // Step 6 - Evidence
  step6Evidence: {
    exerciseId: "framework-step6-evidence",
    chapterId: "FRAMEWORK",
    stepId: "step-6",
    type: "multiple-choice",
    question: "What makes evidence 'plausible' in a presentation?",
    options: [
      "Using lots of data points",
      "Being relevant, recent, and from credible sources",
      "Including footnotes on every slide",
      "Using professional-looking charts",
    ],
    correctIndex: 1,
    explanation:
      "Plausible evidence must pass scrutiny: Is it relevant to the point? Is it recent enough? Is the source credible? Professional formatting alone doesn't create credibility.",
  },

  // Step 7 - Action Titles
  step7Titles: {
    exerciseId: "framework-step7-titles",
    chapterId: "FRAMEWORK",
    stepId: "step-7",
    type: "multiple-choice",
    question:
      "Transform this topic title into an action title: 'Customer Satisfaction Survey'",
    options: [
      "Survey Results Overview",
      "Customer satisfaction reached all-time high of 92%",
      "About Customer Satisfaction",
      "Customer Survey Data",
    ],
    correctIndex: 1,
    hint: "Action titles state an insight or conclusion.",
    explanation:
      "'Customer satisfaction reached all-time high of 92%' states a specific insight. The other options are variations of topic titles that don't communicate any finding.",
  },

  // Step 8 - Visual Excellence
  step8Visual: {
    exerciseId: "framework-step8-visual",
    chapterId: "FRAMEWORK",
    stepId: "step-8",
    type: "true-false",
    question:
      "A chart should prove the headline of the slide, not just relate to the topic.",
    correctAnswer: true,
    explanation:
      "Visuals should serve as evidence for your title's claim. If your title says 'Sales grew 40%', the chart should clearly demonstrate that 40% growth.",
  },

  // Step 9 - Metaphor
  step9Metaphor: {
    exerciseId: "framework-step9-metaphor",
    chapterId: "FRAMEWORK",
    stepId: "step-9",
    type: "multiple-choice",
    question: "When should you use a metaphor in a presentation?",
    options: [
      "On every slide to be creative",
      "Only in casual presentations",
      "When abstract concepts need to be made concrete and memorable",
      "Never - they're unprofessional",
    ],
    correctIndex: 2,
    explanation:
      "Metaphors transform abstract concepts into concrete, relatable images. They're powerful tools for helping audiences understand and remember complex ideas.",
  },
};

// ============================================================================
// TOOLKIT CHAPTER EXERCISES
// ============================================================================

export const TOOLKIT_EXERCISES: Record<string, ExerciseData> = {
  toolkitPurpose: {
    exerciseId: "toolkit-purpose",
    chapterId: "TOOLKIT",
    stepId: "overview",
    type: "multiple-choice",
    question: "What is the main benefit of using the Storymakers toolkit?",
    options: [
      "It replaces the need for strategic thinking",
      "It accelerates production while maintaining quality",
      "It creates presentations automatically",
      "It eliminates the need for feedback",
    ],
    correctIndex: 1,
    explanation:
      "The toolkit accelerates production by providing templates, prompts, and frameworks - but strategic thinking and iteration remain essential for great presentations.",
  },

  toolkitTemplates: {
    exerciseId: "toolkit-templates",
    chapterId: "TOOLKIT",
    stepId: "tools",
    type: "true-false",
    question: "Templates should be followed exactly without modification.",
    correctAnswer: false,
    explanation:
      "Templates are starting points that should be customized for your specific context. The best presentations adapt templates to fit the unique needs of each situation.",
  },

  toolkitReflection: {
    exerciseId: "toolkit-reflection",
    chapterId: "TOOLKIT",
    stepId: "toolkit",
    type: "reflection",
    question:
      "Which aspect of presentation creation takes you the most time? How might the Storymakers toolkit help you work more efficiently?",
    minLength: 50,
    explanation:
      "Understanding your personal bottlenecks helps you get the most value from the toolkit's various components.",
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getExercisesByChapter(chapterId: string): ExerciseData[] {
  switch (chapterId) {
    case "LAYERS":
      return Object.values(LAYERS_EXERCISES);
    case "AGENTS":
      return Object.values(AGENTS_EXERCISES);
    case "FRAMEWORK":
      return Object.values(FRAMEWORK_EXERCISES);
    case "TOOLKIT":
      return Object.values(TOOLKIT_EXERCISES);
    default:
      return [];
  }
}

export function getExercisesByStep(
  chapterId: string,
  stepId: string
): ExerciseData[] {
  const allExercises = getExercisesByChapter(chapterId);
  return allExercises.filter((ex) => ex.stepId === stepId);
}

// Export all exercises for quiz generation
export const ALL_EXERCISES = {
  ...LAYERS_EXERCISES,
  ...AGENTS_EXERCISES,
  ...FRAMEWORK_EXERCISES,
  ...TOOLKIT_EXERCISES,
};
