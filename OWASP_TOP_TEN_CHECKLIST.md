# OWASP Top Ten Web Application Security Risks (2021)

This checklist summarizes the OWASP Top Ten and provides actionable items for auditing your web application:

## 1. Broken Access Control
- Enforce access control on all endpoints
- Deny by default, except for public resources
- Disable directory listing
- Use secure, server-side access checks

## 2. Cryptographic Failures
- Use HTTPS everywhere
- Store passwords with strong hashing (bcrypt, Argon2)
- Avoid deprecated cryptographic algorithms
- Encrypt sensitive data at rest and in transit

## 3. Injection
- Use parameterized queries (e.g., prepared statements)
- Validate and sanitize all user inputs
- Avoid dynamic SQL, OS commands, or code execution

## 4. Insecure Design
- Apply secure design patterns
- Perform threat modeling
- Enforce business logic security

## 5. Security Misconfiguration
- Remove default credentials and unnecessary services
- Keep software and dependencies updated
- Use security headers (e.g., Content-Security-Policy)

## 6. Vulnerable and Outdated Components
- Monitor and update dependencies regularly
- Use tools like npm audit, Snyk, or Dependabot
- Remove unused dependencies

## 7. Identification and Authentication Failures
- Implement multi-factor authentication (MFA)
- Use secure password policies
- Protect against brute-force attacks
- Invalidate sessions on logout

## 8. Software and Data Integrity Failures
- Use signed packages and code
- Validate integrity of dependencies
- Implement CI/CD security controls

## 9. Security Logging and Monitoring Failures
- Log security-relevant events
- Monitor logs for suspicious activity
- Protect log files from unauthorized access

## 10. Server-Side Request Forgery (SSRF)
- Validate and sanitize all URLs from user input
- Block requests to internal resources when possible
- Use allow-lists for outgoing requests

---

For more details, see the [OWASP Top Ten 2021 Report](https://owasp.org/Top10/).
