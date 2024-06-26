package com.example.CoutingStarHotel.controller;

import com.example.CoutingStarHotel.exeption.InvalidBookingRequestException;
import com.example.CoutingStarHotel.exeption.InvalidDiscountRequestException;
import com.example.CoutingStarHotel.exeption.InvalidHotelRequestException;
import com.example.CoutingStarHotel.model.Hotel;
import com.example.CoutingStarHotel.response.HotelResponse;
import com.example.CoutingStarHotel.service.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/hotels")
public class HotelController {
    private final IHotelService hotelService;
    @PostMapping("/hotel/{userId}/addHotel")
    public ResponseEntity<?> addHotel(@PathVariable Long userId,
                                      @RequestParam("hotelName") String hotelName,
                                      @RequestParam("city") String city,
                                      @RequestParam("hotelDescription") String hotelDescription,
                                      @RequestParam("phoneNumber") String phoneNumber,
                                      @RequestParam("photo") MultipartFile photo) throws SQLException, IOException {
        String hotelOwnerName = hotelService.addHotel(userId, hotelName, city, hotelDescription, phoneNumber, photo);
        return ResponseEntity.ok(hotelOwnerName);
    }
    @GetMapping("/all-hotels")
    public ResponseEntity<List<HotelResponse>> getAllHotels(){
        List<Hotel> hotels = hotelService.getAllHotels();
        List<HotelResponse> hotelResponses = new ArrayList<>();
        for (Hotel hotel : hotels){
            HotelResponse hotelResponse = getHotelResponse(hotel);
            hotelResponses.add(hotelResponse);
        }
        return ResponseEntity.ok(hotelResponses);
    }

    @GetMapping("/hotel/{city}/hotels")
    public ResponseEntity<List<HotelResponse>> getHotelsByCity(@PathVariable String city){
        List<Hotel> hotels = hotelService.getAllHotelsByCity(city);
        List<HotelResponse> hotelResponses = hotels.stream()
                .map(this::getHotelResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hotelResponses);
    }

    @PutMapping("/hotel/{hotelId}/updateHotel")
    public ResponseEntity<HotelResponse> updateHotel(@PathVariable Long hotelId,
                                                     @RequestParam(required = false) String hotelName,
                                                     @RequestParam(required = false) String hotelDescription,
                                                     @RequestParam(required = false) String phoneNumber,
                                                     @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
        byte[] photoBytes = photo != null && !photo.isEmpty() ?
                photo.getBytes() : hotelService.getHotelPhotobyHotelId(hotelId);
        Blob photoBlob = photoBytes != null && photoBytes.length >0 ? new SerialBlob(photoBytes): null;
        Hotel theHotel = hotelService.updateHotel(hotelId, hotelName, hotelDescription, phoneNumber, photoBytes);
        theHotel.setPhoto(photoBlob);
        HotelResponse hotelResponse = getHotelResponse(theHotel);
        return ResponseEntity.ok(hotelResponse);
    }

    @DeleteMapping("/hotel/{hotelId}/delete")
    public void deleteHotel(@PathVariable Long hotelId){
        hotelService.deleteHotel(hotelId);
    }

    private HotelResponse getHotelResponse(Hotel hotel){
        return new HotelResponse(
                hotel.getId(),
                hotel.getHotelName(),
                hotel.getCity(),
                hotel.getHotelDescription(),
                hotel.getPhoneNumber(),
                hotel.getPhoto(),
                hotel.getRooms()
        );
    }
}
