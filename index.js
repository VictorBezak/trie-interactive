const ALPHABET_SIZE = 26;

class TrieNode {
    constructor() {
        this.children = new Array(ALPHABET_SIZE).fill(null);
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    searchWord(word) {
        let current = this.root;

        for (const letter of word) {
            const index = letter.charCodeAt() - 'a'.charCodeAt();
            current = current.children[index];
            if (!current) return false;
        }

        return current.isEndOfWord;
    }

    insertWord(word) {
        word = word.toLowerCase();

        let current = this.root;

        for (let char of word) {
            const index = char.charCodeAt() - 'a'.charCodeAt();

            if (!current.children[index]) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }

    deleteWord(word) {
        const dfs = (node, depth) => {
            if (!node) return false;

            if (depth === word.length) {
                if (node.isEndOfWord) {
                    node.isEndOfWord = false;
                    if (!hasChildren(node)) {
                        node = null;
                    }
                    return true;
                } else {
                    return false;
                }
            }

            const index = word.charCodeAt(depth) - 'a'.charCodeAt(0);
            return dfs(node.children[index], depth+1);
        };

        const hasChildren = (node) => node.children.some(v => v != null);

        return dfs(this.root, 0);
    }

    getAllWords(search) {
        const words = [];
        const indexList = search
            ? search.split('').map(ch => ch.charCodeAt() - 'a'.charCodeAt())
            : Array.from({ length: 26 }, (_, index) => index);

        const dfs = (node, currentWord) => {
            if (node === null) {
                return;
            }
    
            if (node.isEndOfWord) {
                words.push(currentWord);
            }
    
            for (const idx of indexList) {
                if (node.children[idx] !== null) {
                    dfs(node.children[idx], currentWord + String.fromCharCode('a'.charCodeAt(0) + idx));
                }
            }
        };
    
        dfs(this.root, '');

        return words;
    }
}


function renderTrie(trie) {
    const render = (node, level = 0) => {
        if (!node) return;

        for (let i = 0; i < ALPHABET_SIZE; i++) {
            let current = node.children[i];

            if (current) {
                const nodeElement = document.createElement("div");
                nodeElement.className = `node`;
                nodeElement.style.top = level * 50 + "px";
                nodeElement.textContent = String.fromCharCode(i + 'a'.charCodeAt());
                document.querySelector("main").appendChild(nodeElement);
                render(current, level+1);
            }
        }
    }

    render(trie.root)
}

const trie = new Trie();
trie.insertWord("at");
trie.insertWord("dog");
trie.insertWord("door");
trie.insertWord("apple");
trie.insertWord("harmonious");
trie.insertWord("harp");
console.info("TRIE:", trie);
// renderTrie(trie);

const searchInput = document.querySelector("input");
const searchSuggestions = document.querySelector(".search-suggestions");
searchInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        trie.insertWord(e.target.value);
        searchInput.value = "";
        searchSuggestions.classList.add("hidden");
    }
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    value === ""
        ? searchSuggestions.classList.add("hidden")
        : searchSuggestions.classList.remove("hidden");

    const words = trie.getAllWords();
    searchSuggestions.innerHTML = "";
    for (const word of words) {
        const div = document.createElement("div");
        div.textContent = word;
        searchSuggestions.appendChild(div);
    }
    console.info(searchSuggestions)
});
