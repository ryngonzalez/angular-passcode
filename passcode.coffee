angular.module('ngPasscode', [])

.directive('passcode', ['$compile', ($compile) ->
  restrict: 'E'
  replace: true
  template: '<div class="passcode" ng-class="{invalid: $invalid}"></div>'
  scope:
    passcode: '=model'
    placeholderValue: '@placeholder'
    passcodeSize: '=size'
  link: (scope, element, attrs) ->

    throw new Error('Must provide numeric passcode size.') if isNaN(scope.passcodeSize)

    modifier = (code) ->
      (code in [46, 8, 9, 27, 13, 91])

    numeric = (code) ->
      (48 <= code <= 57)

    arrow = (code) ->
      (37 <= code <= 40)

    template = '<input type="text" placeholder="{{placeholderValue}}">'
    scope.passcodeParts = new Array(scope.passcodeSize)
    
    for index in [0...scope.passcodeSize]
      do (index) ->
        child = $compile(template)(scope)
        child.on 'keydown', (e) ->

          # Modifier keys or arrow keys
          if modifier(e.keyCode) or arrow(e.keyCode)
            return

          if numeric(e.keyCode)
            child.val('')
            scope.$evalAsync ->
              scope.passcodeParts[index] = child.val()
              child.next()?[0]?.focus()
          else
            e.preventDefault()
            return

        element.append child

    scope.$watchCollection 'passcodeParts', (parts) ->
      passcode = parts.join('')
      if passcode.length is scope.passcodeSize
        scope.passcode = passcode 
      else
        scope.$invalid = true

])
