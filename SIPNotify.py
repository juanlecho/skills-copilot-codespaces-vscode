from pysip import SIPMessage, SIPTransportUDP
from pysip.headers import ContactHeader, EventHeader

def send_notify(target_uri):
    # Create a SIP transport using UDP
    transport = SIPTransportUDP(('0.0.0.0', 0))

    # Create a SIP NOTIFY message
    notify_message = SIPMessage()
    notify_message.method = 'NOTIFY'
    notify_message.to_header = target_uri
    notify_message.from_header = '<sip:sender@example.com>'
    notify_message.call_id = '1234567890@localhost'
    notify_message.cseq_method = 'NOTIFY'

    # Add Event header indicating the event type
    event_header = EventHeader(event='presence')
    notify_message.headers.append(event_header)

    # Add Contact header with the sender's SIP address
    contact_header = ContactHeader('<sip:sender@example.com>')
    notify_message.headers.append(contact_header)

    # Send the NOTIFY message
    transport.send_message(notify_message, target_uri)

# Example usage
target_uri = '<sip:deskphone@example.com>'

send_notify(target_uri)