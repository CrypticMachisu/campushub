// src/utils/eventsStore.js
// Owned by Person 1 per 00-shared-contracts.md §4D. This is a proposed patch
// adding the delete function the peer review flagged as missing, plus a
// same-tab broadcast so other components can react to changes without a
// global state library (see Deliberation Summary).
//
// >>> Coordinate with Person 1 before merging — this touches their file. <

import { events as seedEvents } from "../data/mockData";

const CUSTOM_EVENTS_KEY = "campushub_custom_events";

function readCustomEvents() {
  try {
    const raw = JSON.parse(localStorage.getItem(CUSTOM_EVENTS_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    // Corrupted localStorage shouldn't crash the app.
    return [];
  }
}

function writeCustomEvents(list) {
  localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(list));
  // `storage` events only fire in *other* tabs, not the one that made the
  // change, so we also dispatch a custom event for same-tab listeners.
  window.dispatchEvent(new CustomEvent("campushub:events-updated"));
}

export function getCustomEvents() {
  return readCustomEvents();
}

export function getAllEvents() {
  return [...seedEvents, ...readCustomEvents()];
}

/**
 * Creates a new custom event, or updates one in place if `event.id` already
 * matches an existing custom event (this is what makes "Edit" work — the
 * Dashboard passes the existing id back in on save).
 */
export function saveCustomEvent(event) {
  const list = readCustomEvents();
  const existingIndex = event.id
    ? list.findIndex((e) => e.id === event.id)
    : -1;

  if (existingIndex >= 0) {
    list[existingIndex] = { ...list[existingIndex], ...event };
  } else {
    list.push({ ...event, id: `custom-${Date.now()}` });
  }

  writeCustomEvents(list);
}

// NEW — peer review: delete was entirely missing from v1.
export function deleteCustomEvent(eventId) {
  const list = readCustomEvents().filter((e) => e.id !== eventId);
  writeCustomEvents(list);
}