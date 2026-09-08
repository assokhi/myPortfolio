-- Cloudflare D1 schema. Applied with:
--
--   npx wrangler d1 execute portfolio_db --local  --file=db/schema.sql   # dev
--   npx wrangler d1 execute portfolio_db --remote --file=db/schema.sql   # prod
--
-- D1 is the store for things that are ROWS — submissions you will want to read
-- back, sort and export. Counters live in KV instead: they are single integers
-- with no schema and far more writes.

CREATE TABLE IF NOT EXISTS contact_messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  -- Recorded on the server, never taken from the request body.
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The only query this table gets is "newest first", so it is the only index.
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  -- UNIQUE is the dedupe: the Worker uses INSERT OR IGNORE, so a repeat
  -- signup is a silent success rather than an error the visitor has to read.
  email      TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
