import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntityState } from "../redux.type";
import { Event } from "../../../types/event";

const emptyCalendarEvent = {
  title: "",
  start: "",
  type: "",
};

const initialState: EntityState<Event> = {
  error: null,
  loading: false,
  entities: [],
  entity: emptyCalendarEvent,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await fetch("http://localhost:8999/events");
    if (response.ok) {
      const events = await response.json();
      return events;
    } else {
      throw "Couldn't fetch events";
    }
  } catch (e) {
    throw e;
  }
});

export const searchEventById = createAsyncThunk(
  "events/searchEventById",
  async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8999/events/${id}`);
      if (response.ok) {
        const event = await response.json();
        return event;
      } else {
        throw "Couldn't search event";
      }
    } catch (e) {
      throw e;
    }
  }
);

export const eventCreated = createAsyncThunk(
  "events/eventCreated",
  async (newEvent: Event) => {
    try {
      const response = await fetch("http://localhost:8999/events", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        const event = await response.json();
        return event;
      } else {
        throw "Couldn't create event";
      }
    } catch (e) {
      throw e;
    }
  }
);
export const eventUpdated = createAsyncThunk(
  "events/eventUpdated",
  async (newEvent: Event) => {
    try {
      const response = await fetch(
        `http://localhost:8999/events/${newEvent.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.ok) {
        const event = await response.json();
        return event;
      } else {
        throw `Couldn't update event`;
      }
    } catch (e) {
      throw e;
    }
  }
);

export const eventDeleted = createAsyncThunk(
  "event/eventDeleted",
  async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8999/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const event = await response.json();
        return event;
      } else {
        throw `Couldn't delete event`;
      }
    } catch (e) {
      throw e;
    }
  }
);
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // pending
    [
      fetchEvents,
      searchEventById,
      eventCreated,
      eventDeleted,
      eventUpdated,
    ].forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(thunk.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
      });
    });

    // fulfilled
    builder.addCase(searchEventById.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = false;
    });

    builder.addCase(eventUpdated.fulfilled, (state, action) => {
      const toUpdate = action.payload as Event;
      const i = state.entities.findIndex((event) => event.id === toUpdate.id);
      state.entities[i] = toUpdate;
      state.entity = toUpdate;
      state.loading = false;
    });

    builder.addCase(eventDeleted.fulfilled, (state, action) => {
      const eventId = action.payload.id;
      const eventIndex = state.entities.findIndex(
        (event) => event.id === eventId
      );

      state.entities.splice(eventIndex, 1);
      state.loading = false;
    });
    builder.addCase(eventCreated.fulfilled, (state, action) => {
      state.entities.push(action.payload);
      state.loading = false;
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
  },
});

export default eventsSlice.reducer;
