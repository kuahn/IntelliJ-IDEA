# IntelliJ-IDEA TIPS
[IntelliJ-IDEA homepage](http://kuahn.github.com/IntelliJ-IDEA)

## 기여자
* Kwangun Ahn : [kuahn](https://github.com/kuahn)
* Junha Yang : [yakmoz](https://github.com/yakmoz)
* Kiyong Song : [kiyong](https://github.com/kiyong)

## tip*.json structure
    tip : 번역된 팁,
    org : 원문,
    imgs : 이미지 정보 {
        src : 이미지 경로
    },
    class : 팁 분류


## for example
    {
        "tip": "이미지 파일 이름 자동완성을 위해 HTML, CSS 나 여타 파일에서 기본 자동완성 <span class=\"darkOrangeClr\">(⌃␣)</span> 을 이용하세요.",
        "org" : "Use Basic Completion  within HTML, CSS and other files, for completing image file names.",
        "imgs": [
            {
                "src": "img/2013-03-22_10-51-35.png"
            }
        ],
        "class" : "edit"
    }

## `<span class=\"darkOrangeClr\">(⌃␣)</span>` mean
    dark-orange-color font for highlight

## total count
    properties.json > totalCount 에 작업자가 기재.
    기재하지 않으면 해당 tip이 미반영.