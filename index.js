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
trie.insertWord("dog");
renderTrie(trie);