<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Parking;
use Illuminate\Database\Eloquent\Factories\Factory;

class ParkingFactory extends Factory
{
    protected $model = Parking::class;

    public function definition(): array
    {
        $locations = [
            'Marseille' => '13000',
            'Cannes'    => '06400',
            'Nice'      => '06000',
            'Paris'     => '75000'
        ];

        $city = $this->faker->randomElement(array_keys($locations));
        $zip  = $locations[$city];

        return [
            'name'           => $this->faker->company . ' Parking',
            'number'         => $this->faker->optional()->randomNumber(2),
            'address'        => $this->faker->streetAddress,
            'floor'          => $this->faker->optional()->randomElement(['-1', '0', '1', '2']),
            'zip'            => $zip,
            'city'           => $city,
            'latitude'       => $this->faker->latitude,
            'longitude'      => $this->faker->longitude,
            'remark'         => $this->faker->sentence,
            'height'         => $this->faker->numberBetween(180, 250),
            'width'          => $this->faker->numberBetween(220, 300),
            'length'         => $this->faker->numberBetween(450, 600),
            'has_charge'     => $this->faker->boolean,
            'is_exterior'    => $this->faker->boolean,
            'is_box'         => $this->faker->boolean,
            'user_id'        => User::inRandomOrder()->first()?->id ?? User::factory(),
            'price_per_hour' => $this->faker->numberBetween(150, 500),
            'available'      => true,
            'image_url'      => $this->faker->imageUrl(640, 480, 'parking'),
        ];
    }
}
