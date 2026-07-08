// Combines the static seed events with "custom" events a club admin creates
// at runtime on the Dashboard, so they show up everywhere else too.
// Everyone should read events through this file — never import the raw
// `events` array from mockData.js directly.

import { events as mockEvents } from "../data/mockData";

const CUSTOM_EVENTS_KEY = "campushub_custom_events";

function readCustomEvents() {
  try {
    const raw = localStorage.getItem(CUSTOM_EVENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Just the admin-created events. */
export function getCustomEvents() {
  return readCustomEvents();
}

/** Static seed events + custom events, combined. */
export function getAllEvents() {
  return [...mockEvents, ...readCustomEvents()];
}

/**
 * Create or update a custom event and persist it.
 * If `event.id` matches an existing custom event, it's updated in place;
 * otherwise a new one is created with id `custom-${Date.now()}`.
 */
export function saveCustomEvent(event) {
  const all = readCustomEvents();
  const existingIndex = all.findIndex((e) => e.id === event.id);
  const eventToSave = { ...event, id: event.id || `custom-${Date.now()}` };

  if (existingIndex >= 0) {
    all[existingIndex] = eventToSave;
  } else {
    all.push(eventToSave);
  }

  localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(all));
  return eventToSave;
}

/** Delete a custom event by id (does nothing to seed events). */
export function deleteCustomEvent(eventId) {
  const remaining = readCustomEvents().filter((e) => e.id !== eventId);
  localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(remaining));
  return remaining;
}
