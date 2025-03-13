<img src="static/agentkit_logo_color.png" alt="AgentKit logo" style="width:500px;"/>

[![Lint-Backend](https://github.com/BCG-X-Official/agentkit/actions/workflows/lint-backend.yml/badge.svg?branch=main)](https://github.com/BCG-X-Official/agentkit/actions/workflows/lint-backend.yml?query=branch%3Amain)
[![Lint-Frontend](https://github.com/BCG-X-Official/agentkit/actions/workflows/lint-frontend.yml/badge.svg?branch=main)](https://github.com/BCG-X-Official/agentkit/actions/workflows/lint-frontend.yml?query=branch%3Amain)
[![Tests](https://github.com/BCG-X-Official/agentkit/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/BCG-X-Official/agentkit/actions/workflows/tests.yml?query=branch%3Amain)

# AgentKit: API

## Quickstart locally

### Installation steps

1. Go to the root directory.

2. Copy the `.env.example` file in the root directory of the repository and change the name to `.env`.
   - Change the OPENAI_API_KEY and OPENAI_ORGANIZATION to your own (n.b. OPENAI_ORGANIZATION should be your OpenAI 'Organization ID')

3. ``` make env-create ```

4. ``` cd backend/app ```

4. ``` source .venv/bin/activate ```

### Update environement dependencies 

1. ``` make env-update ```

### Delete environment 

1. ``` make env-delete ```

### Tools

1. ``` make lint ```

1. ``` make test ```
