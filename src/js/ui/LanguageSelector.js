    import { TweenMax, Power4 } from 'gsap';
    import $ from 'jquery';
    
    class LanguageSelector {
        
        
        constructor () {
            
            
        }
        
        
        init ( _country, _langStr ) {

            
            var _this_ = this;
            
            var x, i, j, selElmnt, a, b, c;
            /*look for any elements with the class "custom-select":*/
            x = document.getElementsByClassName("location-select");
            
            for (i = 0; i < x.length; i++) {

                selElmnt = x[i].getElementsByTagName("select")[0];

                // y = this.parentNode.getElementsByClassName("same-as-selected");


                /* For each element, create a new DIV that will act as the selected item: */
                a = document.createElement("DIV");
                a.setAttribute("class", "select-selected flag " + _country);
                a.innerHTML = _langStr;//selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                /* For each element, create a new DIV that will contain the option list: */
                b = document.createElement("DIV");
                b.setAttribute("class", "select-items select-hide");
                for (j = 0; j < selElmnt.length; j++) {
                    /* For each option in the original select element,
                    create a new DIV that will act as an option item: */
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.loc = selElmnt.options[j].value;
                    c.country = selElmnt.options[j].dataset.country;
                    c.setAttribute("class", 'flag ' + c.country);
                    c.setAttribute("data-country", c.country);
                    c.setAttribute("data-lang", c.loc);
                    c.addEventListener("click", function(e) {
                        /* When an item is clicked, update the original select box,
                        and the selected item: */

                        console.log(this.dataset.country);
                        console.log(this.dataset.lang);

                        if ( this.dataset.lang === "en" & this.dataset.country === "us") {
                            window.location.href = window.location.origin;
                        } else {
                            window.location.href = window.location.origin + "/" + this.dataset.country + "/" + this.dataset.lang ;
                        }
                    
                        var y, i, k, s, h;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        h = this.parentNode.previousSibling;
                        h.setAttribute("class", "select-selected flag " + this.getAttribute("class") );
                        for (i = 0; i < s.length; i++) {
                            if (s.options[i].innerHTML == this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                for (k = 0; k < y.length; k++) {
                                    y[k].removeAttribute("class");
                                }
                                // this.setAttribute("class", "same-as-selecteded");
                                break;
                            }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                }
                x[i].appendChild(b);
                
                
                
                a.addEventListener("click", function(e) {
                    
                    /* When the select box is clicked, close any other select boxes,
                    and open/close the current select box: */
                    e.stopPropagation();
                    _this_.closeAllSelect(this);

                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");

                });
            }
            
            document.addEventListener("click", _this_.closeAllSelect);
            
        }
        
       
        
        closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
            except the current select box: */
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
        
        
        
        
    }
    
    
    export default LanguageSelector;
    