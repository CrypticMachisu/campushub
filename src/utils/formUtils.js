// Shared form helper.
// Peer review (01-person1-foundation.md): "Form Validation Standard" —
// trim whitespace so nobody can submit a field that's empty apart from
// spaces. Person 1 has no free-text forms itself (Login is a select
// list; CommentSection already trims its own draft inline), so this is
// exported here for Person 3's signup-style forms and Person 4's event
// forms to reuse rather than each re-implementing the same one-liner.

/**
 * Returns a shallow copy of an object with every string value trimmed.
 * Non-string values pass through unchanged.
 * @param {Object} fields
 * @returns {Object}
 */
export function trimFields(fields) {
  const trimmed = {};
  for (const [key, value] of Object.entries(fields)) {
    trimmed[key] = typeof value === "string" ? value.trim() : value;
  }
  return trimmed;
}
