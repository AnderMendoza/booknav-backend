import Booking from '../../models/Booking';

export const checkAvailableBooking = async ({
  startTime,
  naav,
}: {
  startTime: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  naav: any;
}) => {
  if (new Date(startTime) < new Date()) return false;

  const endTime = new Date(
    // 90 minutes ahead of start time
    new Date(startTime).getTime() + 90 * 60 * 1000
  );

  const bookings = await Booking.find({
    $or: [
      {
        startTime: { $lte: new Date(startTime) },
        endTime: { $gt: new Date(startTime) },
      },
      {
        startTime: { $lt: new Date(endTime) },
        endTime: { $gte: new Date(endTime) },
      },
    ],
  });

  if (bookings.length > 0) {
    return false;
  }
  if (!naav.isPublished) return false;

  return true;
};
