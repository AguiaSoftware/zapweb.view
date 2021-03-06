﻿yum.define([

], function () {

    $.fn.drag = function (opt) {

        opt = $.extend({ handle: "", cursor: "move" } , {
            x: true,
            y: true,
            move: function(){
                
            }
        }, opt);

        if (opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            if (opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                var offset = {};

                if(opt.x && opt.y){
                    offset = {
                        top: e.pageY + pos_y - drg_h,
                        left: e.pageX + pos_x - drg_w
                    };
                }else if(opt.x){
                    offset = {
                        left: e.pageX + pos_x - drg_w
                    };
                }else if(opt.y){
                    offset = {
                        top: e.pageY + pos_y - drg_h,
                    }
                }

                opt.move(offset);

                $('.draggable').offset(offset).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', 9999999);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }

});