We now have the ACTUAL project requirement.

Do not treat this as a generic "test case generation chatbot".

The project is an AI-assisted software testing system with these exact core objectives:

1. AI-generated UNIT test cases derived from software requirements.
2. AI-generated INTEGRATION test cases derived from requirements and component/module interactions.
3. MISRA / static-analysis finding TRIAGE and assistance.
4. Automated REGRESSION-SUITE upkeep when requirements/code change.

Our current baseline model is:

Qwen3-8B

running locally in:

4-bit NF4 quantization

on:

NVIDIA RTX 4060, approximately 8 GB VRAM.

IMPORTANT:

The existing Qwen3-8B setup has already been verified to run successfully on the GPU.

DO NOT replace it with Qwen3-4B.

DO NOT download another model.

DO NOT modify the model quantization.

DO NOT attempt Qwen3-32B.

DO NOT introduce RAG.

DO NOT introduce LoRA/QLoRA.

DO NOT fine-tune.

DO NOT introduce a second model.

DO NOT redesign the application.

At this stage we are performing a BASELINE CAPABILITY STUDY.

The question we need to answer is:

"How much of the actual project requirement can Qwen3-8B perform before we add company-specific data, RAG, fine-tuning, or additional models?"

==================================================

1. PRESERVE THE EXISTING WORKING SYSTEM
   ==================================================

Do not break the existing:

qwen_test_generator/

Inspect the current implementation first.

Preserve:

* Qwen3-8B model
* 4-bit NF4 configuration
* RTX 4060 GPU execution
* model_loader.py
* generation pipeline
* experiment logging
* Streamlit application
* existing outputs
* existing smoke tests

Do not reinstall PyTorch/CUDA unnecessarily.

Do not change the working environment unless absolutely necessary.

==================================================
2. CHANGE THE BENCHMARK TO MATCH THE REAL PROJECT
=================================================

Create:

qwen_test_generator/benchmark/

with:

benchmark/
├── project_test_cases.json
├── evaluation_rubric.md
├── run_benchmark.py
├── evaluate_results.py
└── results/

The benchmark must NOT focus primarily on generic web-login QA examples.

It must directly test the four actual project capabilities.

==================================================
3. CAPABILITY A — REQUIREMENT TO UNIT TESTS
===========================================

Create at least 10 unit-test-generation scenarios.

They should progressively increase in difficulty.

Include examples covering:

1. Simple functional requirement
2. Conditional logic
3. Boundary condition
4. Input validation
5. Error handling
6. State transition
7. Timeout behavior
8. Multiple conditions
9. Safety/interlock behavior
10. Ambiguous requirement

Use realistic software/embedded-style requirements.

Examples may involve:

* sensor input
* controller logic
* state machines
* actuator commands
* timeout
* alarms
* interlocks
* fault states
* start/stop
* manual/automatic mode

But DO NOT invent company-specific rules.

For each requirement, ask the model to derive unit tests.

The generated tests should include, where applicable:

* Test ID
* Requirement reference
* Preconditions
* Input
* Procedure
* Expected result
* Test purpose

The model must distinguish between:

EXPLICIT REQUIREMENT

and

ASSUMPTION / DOMAIN EXPECTATION.

It must NOT silently invent thresholds or business rules.

==================================================
4. CAPABILITY B — REQUIREMENT TO INTEGRATION TESTS
==================================================

Create at least 8 integration-test scenarios.

These must test interactions between components.

Examples:

Sensor → Controller

Controller → Actuator

Module A → Module B

Input subsystem → Processing module → Output subsystem

Communication module → Controller

Alarm subsystem → HMI

Create scenarios involving:

* valid data flow
* invalid data flow
* communication timeout
* missing response
* state synchronization
* error propagation
* recovery
* multiple modules interacting

The model should identify:

* participating components
* interface/input
* expected interaction
* sequence
* expected output/state
* failure behavior

The goal is to determine whether Qwen3-8B understands INTERACTION testing rather than simply generating individual unit tests.

==================================================
5. CAPABILITY C — MISRA / STATIC-ANALYSIS TRIAGE
================================================

Create at least 8 synthetic MISRA/static-analysis scenarios.

Do not claim that the model has authoritative knowledge of a company's MISRA deviation policy.

The scenarios should contain information such as:

* small C/C++ code snippet
* static-analysis warning
* rule identifier
* location
* warning description

Ask the model to analyze:

1. What the finding means
2. What code construct caused it
3. Whether the provided information appears consistent with the finding
4. Potential risk
5. Severity/priority reasoning
6. Suggested remediation
7. Whether additional human review is needed
8. Possible test impact

IMPORTANT:

The model must NOT blindly declare a finding to be a false positive.

If the supplied information is insufficient, it must explicitly say:

"Insufficient information to determine."

The model must not invent:

* project coding standards
* deviation approvals
* safety classifications
* company policies
* rule exceptions

For MISRA-related output, clearly distinguish:

FACT FROM PROVIDED INPUT

vs

MODEL REASONING

vs

ASSUMPTION

==================================================
6. CAPABILITY D — REGRESSION-SUITE UPKEEP
=========================================

Create at least 8 regression-maintenance scenarios.

Each scenario should contain:

* existing requirement
* existing test cases
* changed/new requirement

Ask the model to determine:

1. Which existing tests remain valid
2. Which tests need modification
3. Which tests should be added
4. Which tests may become obsolete
5. Why each test is affected
6. Whether unit or integration coverage is affected

Include changes such as:

* changed input behavior
* changed boundary
* changed state transition
* changed timeout behavior
* changed error handling
* new requirement
* removed requirement
* changed interface

The model must reason about IMPACT rather than simply regenerate every test.

==================================================
7. CREATE DIFFICULTY LEVELS
===========================

Every benchmark case must have:

difficulty:

* EASY
* MEDIUM
* HARD

We need enough HARD cases to expose reasoning weaknesses.

Do not make the benchmark artificially easy.

==================================================
8. TOTAL BENCHMARK
==================

Create approximately:

10 unit-test cases
8 integration-test cases
8 MISRA/static-analysis cases
8 regression-maintenance cases

TOTAL:

34 benchmark cases.

If some scenarios naturally overlap, keep the categories clearly separated.

Every case must contain:

* id
* capability
* difficulty
* input
* expected_focus
* evaluation_points

==================================================
9. QWEN3 THINKING MODE
======================

Do NOT permanently disable thinking mode for this project.

This project requires reasoning, especially for:

* complex requirements
* state transitions
* integration behavior
* MISRA analysis
* regression impact analysis

Run the benchmark in a controlled way.

For the FIRST baseline run, create two modes:

MODE A:

Qwen3-8B
thinking OFF

MODE B:

Qwen3-8B
thinking ON

Do NOT change anything else between the two modes.

This will tell us whether Qwen3's reasoning mode materially helps our actual project.

Use Qwen's recommended generation settings for each mode rather than using arbitrary settings.

For thinking mode, use the model's recommended sampling configuration.

For non-thinking mode, use the model's recommended non-thinking configuration.

Record the exact settings in the results.

Do not compare the modes using different prompts.

The same benchmark inputs must be used for both.

==================================================
10. FIXED OUTPUT FORMAT
=======================

Require the model to produce structured test cases.

For unit/integration/regression cases use:

TEST CASE ID
REQUIREMENT REFERENCE
TEST TYPE
OBJECTIVE
PRECONDITIONS
INPUT / STIMULUS
STEPS
EXPECTED RESULT
SOURCE / BASIS
ASSUMPTIONS

SOURCE / BASIS must be one of:

Explicit Requirement
Logical Invariant
Domain Expectation
Assumption

For MISRA/static-analysis cases use:

FINDING
RULE
CODE CONTEXT
ANALYSIS
RISK
RECOMMENDED ACTION
TEST IMPACT
CONFIDENCE
ASSUMPTIONS

If information is missing:

say so.

Do not fabricate it.

==================================================
11. EVALUATION RUBRIC
=====================

Create:

benchmark/evaluation_rubric.md

Use separate rubrics for each capability.

UNIT TEST RUBRIC:

* requirement understanding
* requirement coverage
* positive coverage
* negative coverage
* boundary coverage
* expected-result correctness
* traceability
* logical correctness
* unsupported-assumption avoidance
* practical usefulness

INTEGRATION RUBRIC:

* component identification
* interface understanding
* sequence correctness
* data-flow coverage
* failure-path coverage
* recovery coverage
* expected-result quality
* traceability
* logical correctness
* practical usefulness

MISRA/STATIC ANALYSIS RUBRIC:

* finding comprehension
* rule/context understanding
* code reasoning
* risk reasoning
* remediation quality
* uncertainty handling
* avoidance of invented policy
* test-impact reasoning
* technical usefulness
* human-review awareness

REGRESSION RUBRIC:

* change understanding
* affected-test identification
* tests-to-add reasoning
* tests-to-modify reasoning
* obsolete-test identification
* traceability
* dependency reasoning
* coverage preservation
* logical correctness
* practical usefulness

Each dimension:

0–10

Total:

100

Use:

80–100 = PASS
50–79 = PARTIAL
0–49 = FAIL

==================================================
12. IMPORTANT EVALUATION RULE
=============================

DO NOT let Qwen3-8B evaluate its own answers.

The model generates the result.

Human evaluation determines quality.

The system may assist with displaying the rubric, but do not use another LLM to grade the baseline.

==================================================
13. SAVE EVERY RESULT
=====================

For every benchmark execution save:

* timestamp
* model
* model path
* quantization
* GPU
* capability
* case ID
* difficulty
* prompt
* raw output
* thinking mode
* temperature
* top_p
* top_k
* max_new_tokens
* generation time
* tokens generated
* tokens/sec
* errors
* status

Never overwrite previous benchmark results.

Use timestamped files.

==================================================
14. RUN THE COMPLETE BASELINE
=============================

Run all 34 scenarios in:

MODE A — thinking OFF

Then run all 34 scenarios in:

MODE B — thinking ON

Total:

68 model generations.

If a technical failure occurs, record it and continue where possible.

Do NOT rerun cases simply because the output is poor.

Poor output is useful evidence.

==================================================
15. CREATE SUMMARY
==================

Generate a summary showing:

Capability | Thinking OFF | Thinking ON

Unit Test Generation
Integration Test Generation
MISRA/Static Analysis
Regression Maintenance

Do NOT calculate quality scores until human evaluation has been completed.

For generation-only metrics, report:

* successful generations
* failed generations
* average generation time
* average tokens/sec

==================================================
16. CREATE A HUMAN EVALUATION WORKFLOW
======================================

Create a simple mechanism for us to review each generated output.

For each case we need to enter:

* dimension scores
* total score
* PASS/PARTIAL/FAIL
* failure types
* notes

Failure types should include:

* missed requirement
* incomplete coverage
* incorrect test
* incorrect expected result
* invented requirement
* invented threshold
* unsupported assumption
* duplicate test
* weak integration reasoning
* weak state reasoning
* weak failure reasoning
* incorrect MISRA reasoning
* unsupported false-positive claim
* weak remediation
* weak regression impact analysis
* excessive generic output

==================================================
17. DO NOT DRAW CONCLUSIONS YET
===============================

Do NOT say:

"Qwen3-8B is sufficient."

Do NOT say:

"Qwen3-8B is insufficient."

Do NOT recommend fine-tuning yet.

Do NOT recommend RAG yet.

Do NOT recommend another model yet.

The purpose of this experiment is to generate evidence.

After the human evaluation, we will determine:

WHAT QWEN3-8B CAN ALREADY DO

WHAT IT CANNOT DO

WHICH FAILURES ARE CAUSED BY:

* prompting
* missing context
* reasoning limitations
* domain knowledge
* long-context requirements
* structured-output problems

Then we will decide whether each weakness should be addressed using:

* prompt engineering
* RAG
* company knowledge base
* LoRA/QLoRA
* another lightweight model
* separate specialized worker/model

==================================================
18. FINAL REPORT
================

When finished, report:

1. Number of benchmark cases
2. Number of Unit Test cases
3. Number of Integration cases
4. Number of MISRA cases
5. Number of Regression cases
6. Thinking OFF generation results
7. Thinking ON generation results
8. Average generation time
9. Average tokens/sec
10. Files created
11. Results location
12. Any technical failures

Then STOP.

DO NOT make additional architecture changes.

The next decision will be made only after we inspect these results.

FINAL OBJECTIVE:

We need to determine how much of this exact project Qwen3-8B can perform as a local base model:

```
REQUIREMENTS
     |
     +------------------+
     |                  |
     v                  v
 UNIT TESTS       INTEGRATION TESTS
     |                  |
     +--------+---------+
              |
              v
      TEST KNOWLEDGE
              |
   +----------+----------+
   |                     |
   v                     v
```

MISRA / STATIC         REGRESSION
ANALYSIS TRIAGE        SUITE UPKEEP

Evaluate the actual capabilities above.

Do not substitute generic chatbot or generic QA evaluation.
