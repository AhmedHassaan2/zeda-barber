# Contributing to Ahmed Enterprise AI Engineering Workspace

Thank you for your interest in contributing!

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or suggest improvements
- Include steps to reproduce for bug reports
- Label issues appropriately (bug, enhancement, documentation)

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes following the conventions below
4. Test your changes
5. Commit with a descriptive message: `feat(scope): description`
6. Push and create a Pull Request

### Conventions

#### Agents
- File: `agents/{name}.md`
- Must include: description, mode, temperature, permission, content
- Content must be >80 lines with clear role definition

#### Skills
- File: `skills/{name}/SKILL.md`
- Must include: name, description, category, level, priority
- Must include code examples and anti-patterns

#### Commands
- File: `commands/{name}/command.md`
- Must include: name, description, allowed_tools, agent
- Must include usage examples and process steps

#### Playbooks
- File: `playbooks/{name}.md`
- Must include all 10 required sections: Goal, Trigger, Inputs, Outputs, Required Agents/Skills/Commands, Validation Steps, Success Criteria, Common Pitfalls

### Quality Standards

- No `any` types in TypeScript examples
- All code examples must be syntactically valid
- Content must be practical and specific
- No placeholder text (TODO, FIXME)
- Follow naming conventions (kebab-case for files, PascalCase for components)

### What We're Looking For

- New skills for underserved engineering domains
- Improved playbooks for existing workflows
- Knowledge documents for emerging technologies
- Better examples for common patterns
- Bug fixes and quality improvements

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
