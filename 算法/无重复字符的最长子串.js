// 无重复字符的最长子串
var lengthOfLongestSubstring = function(s) {
    if (!s) return 0;
    let max = 1 ,r = 1, set = new Set();
    s = s.split('');
    for (let i = 0; i < s.length; i++) {
        if (!set.has(s[i])) {
            set.add(s[i])
        } else {
            r = set.size;
            if (r > max) {
                max = r;
                if(max > (s.length - i)) {
                    return max;
                }
            }
            set.clear();
        }
    }
     return set.size > max ? set.size : max;;
    
};