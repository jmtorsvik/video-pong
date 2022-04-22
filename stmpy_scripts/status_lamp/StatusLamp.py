from stmpy import Machine

class StatusLamp:
    
    def __init__(self):
        self.lamp1 = False # define lamp 1 here (somehow...)
        self.lamp2 = False # define lamp 2 here (somehow...)
    
    # turns lamp1 off
    def lamp1_off(self):
        self.lamp1 = False
        print("lamp1 turned off")

    # turns lamp1 on
    def lamp1_on(self):
        self.lamp1 = True
        print("lamp1 turned on")

    # turns lamp2 off
    def lamp2_off(self):
        self.lamp2 = False
        print("lamp2 turned off")

    # turns lamp2 on
    def lamp2_on(self):
        self.lamp2 = True
        print("lamp2 turned on")
      
status_lamp = StatusLamp()

# define transitions
t0 = {'source': 'initial',
      'target': 'idle'
}

t1 = {'trigger':'start_video',
      'source':'idle',
      'target':'in_video',
}

t2 = {'trigger':'stop', 
      'source':'in_video', 
      'target':'idle', 
}

t3 = {'trigger':'start_game', 
      'source':'in_video', 
      'target':'in_game', 
}

t4 = {'trigger':'stop_game', 
      'source':'in_game', 
      'target':'in_video', 
}

t5 = {'trigger':'stop', 
      'source':'in_game', 
      'target':'idle', 
}

# define states
idle = {'name': 'idle',
       'entry': 'lamp1_off; lamp2_off'
}

in_video = {'name': 'in_video',
      'entry': 'lamp1_on; lamp2_off'
}

in_game = {'name': 'in_game',
      'entry': 'lamp2_on'
}

# define state machine
stm_status_lamp = Machine(name='stm_status_lamp', transitions=[t0, t1, t2, t3, t4, t5], states=[idle, in_video, in_game], obj=status_lamp)
status_lamp.stm = stm_status_lamp