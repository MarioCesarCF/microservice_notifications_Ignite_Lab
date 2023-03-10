import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-repositorei';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification.', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notificacion = makeNotification();

    await notificationRepository.create(notificacion);

    await readNotification.execute({
      notificationId: notificacion.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
