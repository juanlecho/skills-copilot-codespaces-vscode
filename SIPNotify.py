from twisted.internet import reactor
from twisted.internet.protocol import DatagramProtocol
from twisted.internet import defer
from twisted.protocols.basic import LineReceiver

class SIPNotifier(LineReceiver):
    def __init__(self, target_ip, target_port):
        self.target_ip = target_ip
        self.target_port = target_port

    def connectionMade(self):
        self.sendNotify()

    def sendNotify(self):
        event = 'telephony-event;id=1'

        notify_message = f"""\
NOTIFY sip:{self.target_ip}:{self.target_port} SIP/2.0
To: <sip:{self.target_ip}:{self.target_port}>
From: <sip:bob@example.com>
Call-ID: 1234567890@localhost
CSeq: 1 NOTIFY
Event: {event}
Subscription-State: active
Content-Length: 0\r\n\r\n"""

        self.sendLine(notify_message.encode('utf-8'))
        self.transport.loseConnection()

def send_notify(target_ip, target_port):
    factory = DatagramProtocol()
    factory.protocol = lambda: SIPNotifier(target_ip, target_port)
    reactor.listenUDP(0, factory)

def main():
    target_ip = '192.168.0.100'
    target_port = 5060  # Adjust the target port accordingly

    send_notify(target_ip, target_port)
    reactor.run()

if __name__ == '__main__':
    main()