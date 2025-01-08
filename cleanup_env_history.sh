git filter-branch --force --index-filter "git rm --cached --ignore-unmatch app/config/supabaseConfig.ts" --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
git push origin --force --tags