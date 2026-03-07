-- Create resumes table
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid, -- Optional for now, assuming anonymous usage is allowed for testing
  personal_info jsonb not null default '{}'::jsonb,
  education jsonb[] not null default '{}'::jsonb[],
  experience jsonb[] not null default '{}'::jsonb[],
  skills text[] not null default '{}'::text[],
  generated_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table resumes enable row level security;

-- Create policy for anonymous users to insert and select their own resumes (if using auth, adjust accordingly)
-- For this initial version, we will allow open access for easy testing, but this is NOT secure for production.
create policy "Allow anonymous insert" on resumes for insert to anon with check (true);
create policy "Allow anonymous select" on resumes for select to anon using (true);

-- Create a generic trigger to auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resumes_modtime BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
