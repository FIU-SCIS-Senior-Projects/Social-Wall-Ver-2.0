(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .controller('SlideShowCtrl', function($scope, $timeout, $window, QueueService, DataService) {
              
        var INTERVAL = DataService.getTransitionSpeed();
        var slides = [];
        //var slides = DataService.getPhotos();
        //console.log("in slideshow " + slides[1].link);
        
        
        
    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.$on('queueProgress', function(event, queueProgress) {
        $scope.$apply(function(){
            $scope.progress = queueProgress.progress * 100;
        });
    });

    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function(){
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = '.instant-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;
    

       $scope.$watch(DataService.arePhotosSet, function() {
        console.log(DataService.arePhotosSet());
            if (DataService.arePhotosSet() == true) {
                
            
                slides = DataService.getPhotos();
                //DataService.setphotosSet(true);
                loadSlides();
                //DataService.setphotosSet(false);
            }
         });
        
        
    });
})();

    
(function () {
    'use strict';
     
    angular.module('socialWall-receiver')
    .animation('.slide-left-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { left: $window.innerWidth}, {left: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
        }
    };
});
    
    })();
    
    
    (function () {
    'use strict';
    
    angular.module('socialWall-receiver')
    .animation('.instant-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { right: -$window.innerWidth}, {right: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {right: $window.innerWidth, onComplete: done});
        }
    };
});
    
    })();
    
(function () {
    'use strict';

    angular.module('socialWall-receiver')
    .animation('.slide-down-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { top: -$window.innerHeight}, {top: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
        }
    };
});
    
    })();
    
(function () {
    'use strict';    

    angular.module('socialWall-receiver')
    .animation('.fade-in-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {opacity: 0, onComplete: done});
        }
    };
});
    
    })();




