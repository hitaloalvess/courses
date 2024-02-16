# courses

# Commands to merge course repositories into the root courses repository

git remote add -f repo1 <URL do repo1>

# Crie uma nova branch para mesclar o repositório repo1
git checkout -b merge-repo1

# Adicione repo1 como uma subárvore do repositório repo3
git merge --allow-unrelated-histories -s ours --no-commit repo1/master
git read-tree --prefix=pasta1/ -u repo1/master

# Faça o commit das alterações
git commit -m "Adicionado repo1 como subpasta de repo3"

# Volte para a branch principal (geralmente a branch master)
git checkout master

# Mesclar as alterações da branch de mesclagem no repositório principal
git merge merge-repo1

# Remova a branch de mesclagem, se não for mais necessária
git branch -d merge-repo1