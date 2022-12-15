import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-repositorei';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification.', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notificacion = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notificacion);

    await unreadNotification.execute({
      notificationId: notificacion.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBe(null);
  });

  it('should not be able to unread a non existing notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
